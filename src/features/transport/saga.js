import { compose, filter, first, isEmpty, range, uniqBy } from 'lodash/fp';
import { eventChannel, takeEvery } from 'redux-saga';
import { call, fork, put, select, take } from 'redux-saga/effects';
import Tone from '../../audio-server/tone';
import appData from '../app-data';
import sequenceData from '../sequence-data';
import tracksData from '../tracks-data';
import song from '../song';
import * as actions from './actions';
import * as constants from './constants';
import * as helpers from './helpers';
import * as selectors from './selectors';

const { STARTED } = constants.playbackStates;

function* createSequences() {
  const songSequences = yield select(song.selectors.getSequences);
  const sequenceStepsChannel = sequenceStepsChannelFactory(songSequences);

  const sequencesSetAction = yield take(sequenceStepsChannel);

  yield put(sequencesSetAction);

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const sequenceStepAction = yield take(sequenceStepsChannel);
    yield put(sequenceStepAction);
  }
}

function* createSongSequence() {
  const measureCount = yield select(song.selectors.getMeasureCount);
  const stepsChannel = songSequenceStepsChannelFactory(measureCount);
  const setAction = yield take(stepsChannel);
  yield put(setAction);

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const stepAction = yield take(stepsChannel);
    yield put(stepAction);
  }
}

function* initialize() {
  yield put(actions.sequencesUpdated());
  yield* updateSong();
}

function* loopSequence() {
  const { measureCount, position } = yield select(song.selectors.getActiveSequence);
  const start = helpers.measuresToTime(position);
  const end = helpers.measuresToTime(position + measureCount);
  const startPoint = Tone.getTransportTime(start);
  yield put(actions.startPointSet(startPoint));
  // yield put(actions.startPointSet(`+${start}`));
  Tone.setTransportLoopPoints(start, end);
  Tone.setTransportLoop(true);
  const playbackState = yield select(selectors.getPlaybackState);
  yield put(actions.playbackStopped());
  if (playbackState === STARTED) {
    yield call(() => new Promise(resolve => setTimeout(resolve, 16)));
    yield put(actions.playbackStarted());
  }
}

function* loopSong() {
  const songMeasureCount = yield select(song.selectors.getMeasureCount);
  const end = helpers.measuresToTime(songMeasureCount);
  yield put(actions.startPointSet('0'));
  Tone.setTransportLoopPoints('0', end);
  Tone.setTransportLoop(true);
  const playbackState = yield select(selectors.getPlaybackState);
  yield put(actions.playbackStopped());
  if (playbackState === STARTED) {
    yield call(() => new Promise(resolve => setTimeout(resolve, 16)));
    yield put(actions.playbackStarted());
  }
}

function* pause() {
  if (Tone.getTransportState() !== 'paused') {
    yield call(() => {
      Tone.pauseTransport();
    });
  }
}

function* play() {
  if (Tone.getTransportState() === 'stopped') {
    const startPoint = yield select(selectors.getStartPoint);
    yield call(() => {
      Tone.startTransport(undefined, startPoint);
    });
  }

  if (Tone.getTransportState() === 'paused') {
    yield call(() => {
      Tone.startTransport();
    });
  }
}

function* sequenceStep({ payload }) {
  const { sequence, step, time } = payload;
  const isAnyTrackSoloing = yield select(song.selectors.getIsAnyTrackSoloing);
  const track = yield select(song.selectors.getTrackById(sequence.trackId));
  const activeSequenceId = yield select(song.selectors.getActiveSequenceId);
  const isActiveSequence = activeSequenceId === sequence.id;

  if ((!track.isMuted && !(isAnyTrackSoloing && !track.isSoloing)) || isActiveSequence) {
    const notes = yield select(song.selectors.getNotesBySequenceId(sequence.id));
    const notesAtStep = compose(
      uniqBy(note => first(note.points).y),
      filter(note => first(note.points).x === step),
    )(notes);

    for (let i = 0; i < notesAtStep.length; i += 1) {
      const note = notesAtStep[i];
      yield put(actions.noteTriggered({
        channelId: sequence.trackId,
        note,
        time,
      }));
    }
  }

  if (!isActiveSequence) return;

  yield put(actions.positionSet(step));
}

function* setBPM(action) {
  yield call(() => {
    Tone.setTransportBPM(action.bpm);
  });
}

function* setTransportPosition({ measures }) {
  const position = helpers.measuresToTime(measures);
  Tone.setTransportPosition(position);
  yield put(actions.songPositionSet(measures * 32));
}

function* songSequenceStep(action) {
  const { step } = action.payload;
  yield put(actions.songPositionSet(step));
}

function* stop() {
  if (Tone.getTransportState() !== 'stopped') {
    yield call(Tone.stopTransport);
  }
}

function* togglePlayPause() {
  const playbackState = yield select(selectors.getPlaybackState);
  if (playbackState === STARTED) {
    yield put(actions.playbackStarted());
  } else {
    yield put(actions.playbackPaused());
  }
}

function* updateSequences() {
  const sequences = yield select(selectors.getSequences);
  sequences.forEach(s => s.dispose());
  yield fork(createSequences);
}

function* updateSong() {
  yield* updateSongSequence();
  const activeSequenceId = yield select(song.selectors.getActiveSequenceId);

  if (activeSequenceId) {
    yield* loopSequence();
  } else {
    yield* loopSong();
  }

  const isPlaying = yield select(selectors.getIsPlaying);
  yield put(actions.playbackStopped());
  if (isPlaying) {
    yield call(() => new Promise(resolve => setTimeout(resolve, 16)));
    yield put(actions.playbackStarted());
  }
}

function* updateSongSequence() {
  const sequence = yield select(selectors.getSongSequence);
  if (!isEmpty(sequence)) {
    sequence.dispose();
  }
  yield fork(createSongSequence);
}

export default function* saga() {
  yield [
    takeEvery(actions.PLAYBACK_STARTED, play),
    takeEvery(actions.PLAYBACK_PAUSED, pause),
    takeEvery(actions.PLAYBACK_STOPPED, stop),
    takeEvery(actions.PLAYBACK_TOGGLED, togglePlayPause),
    takeEvery(actions.SEQUENCE_STEP_TRIGGERED, sequenceStep),
    takeEvery(actions.SONG_SEQUENCE_STEP_TRIGGERED, songSequenceStep),
    takeEvery(actions.TRANSPORT_POSITION_SET, setTransportPosition),
    takeEvery([
      actions.SEQUENCES_UPDATED,
      tracksData.actions.SEQUENCE_EXTENDED,
      tracksData.actions.SEQUENCE_NUDGED_LEFT,
      tracksData.actions.SEQUENCE_NUDGED_RIGHT,
      tracksData.actions.SEQUENCE_SHORTENED,
    ], updateSequences),
    takeEvery(appData.actions.BPM_SET, setBPM),
    takeEvery(appData.actions.SONG_LOADED, initialize),
    takeEvery(sequenceData.actions.SEQUENCE_CLOSED, loopSong),
    takeEvery(tracksData.actions.SEQUENCE_OPENED, loopSequence),
    takeEvery(tracksData.actions.SONG_EXTENDED, updateSong),
    takeEvery(tracksData.actions.SONG_SHORTENED, updateSong),
  ];
}

function createSequence(songSequence, ...rest) {
  const sequence = Tone.createSequence(...rest);
  const start = helpers.measuresToTime(songSequence.position);
  sequence.loop = false;
  sequence.start(start);
  return sequence;
}

function songSequenceStepsChannelFactory(measureCount) {
  return eventChannel((emit) => {
    const sequence = Tone.createSequence(
      (time, step) => {
        emit(actions.songSequenceStepTriggered({ step, time }));
      },
      range(0, measureCount * 32),
      '32n',
    );
    sequence.loop = false;
    sequence.start('0');
    setTimeout(() => emit(actions.songSequenceSet(sequence)));
  });
}

function sequenceStepsChannelFactory(songSequences) {
  return eventChannel((emit) => {
    const sequences = songSequences.map(sequence => createSequence(
      sequence,
      (time, step) => {
        emit(actions.sequenceStepTriggered({ sequence, step, time }));
      },
      range(0)(sequence.measureCount * 32),
      '32n',
    ));

    setTimeout(() => emit(actions.sequencesSet(sequences)));
  });
}
