import _ from 'lodash';
import { eventChannel, takeEvery } from 'redux-saga';
import { call, fork, put, select, take } from 'redux-saga/effects';
import Tone from 'tone';
import playing from '../playing';
import shortcuts from '../shortcuts';
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
  console.log('start', start);
  const startPoint = new Tone.TransportTime(start).toBarsBeatsSixteenths();
  console.log('startPoint', startPoint);
  yield put(actions.startPointSet(startPoint));
  // yield put(actions.startPointSet(`+${start}`));
  Tone.Transport.setLoopPoints(start, end);
  Tone.Transport.loop = true;
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
  Tone.Transport.setLoopPoints('0', end);
  Tone.Transport.loop = true;
  const playbackState = yield select(selectors.getPlaybackState);
  yield put(actions.playbackStopped());
  if (playbackState === STARTED) {
    yield call(() => new Promise(resolve => setTimeout(resolve, 16)));
    yield put(actions.playbackStarted());
  }
}

function* pause() {
  if (Tone.Transport.state !== 'paused') {
    yield call(() => {
      Tone.Transport.pause();
    });

    yield put(playing.actions.allInstrumentsReleased());
  }
}

function* play() {
  if (Tone.Transport.state === 'stopped') {
    const startPoint = yield select(selectors.getStartPoint);
    console.log(startPoint);
    yield call(() => {
      Tone.Transport.start(undefined, startPoint);
    });
  }

  if (Tone.Transport.state === 'paused') {
    yield call(() => {
      Tone.Transport.start();
    });
  }
}

function* sequenceStep({ payload }) {
  const { sequence, step, time } = payload;
  const isAnyTrackSoloing = yield select(song.selectors.getIsAnyTrackSoloing);
  const track = yield select(song.selectors.getTrackById(sequence.trackId));
  const activeSequenceId = yield select(song.selectors.getActiveSequenceId);
  const isActiveSequence = activeSequenceId === sequence.id;

  if (!track.isMuted && !(isAnyTrackSoloing && !track.isSoloing) || isActiveSequence) {
    const notes = yield select(song.selectors.getNotesBySequenceId(sequence.id));
    const notesAtStep = _(notes)
      .filter(note => _.first(note.points).x === step)
      .uniqBy(note => _.first(note.points).y)
      .value();

    for (let i = 0; i < notesAtStep.length; i++) {
      const note = notesAtStep[i];
      yield put(playing.actions.notePlayed({
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
    Tone.Transport.bpm.value = action.bpm;
  });
}

function* setTransportPosition({ measures }) {
  const position = helpers.measuresToTime(measures);
  Tone.Transport.position = position;
  yield put(actions.songPositionSet(measures * 32));
  yield put(playing.actions.allInstrumentsReleased());
}

function* songSequenceStep(action) {
  const { step } = action.payload;
  yield put(actions.songPositionSet(step));
}

function* stop() {
  if (Tone.Transport.state !== 'stopped') {
    yield call(() => {
      Tone.Transport.stop();
    });
    yield put(playing.actions.allInstrumentsReleased());
  }
}

function* togglePlayPause() {
  const playbackState = yield select(selectors.getPlaybackState);
  if (playbackState === STARTED) {
    yield* play();
  } else {
    yield* pause();
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
  if (!_.isEmpty(sequence)) {
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
      song.actions.SEQUENCE_EXTENDED,
      song.actions.SEQUENCE_NUDGED_LEFT,
      song.actions.SEQUENCE_NUDGED_RIGHT,
      song.actions.SEQUENCE_SHORTENED,
      song.actions.SEQUENCES_ADDED,
      song.actions.SEQUENCES_DELETED,
      song.actions.SEQUENCES_SET,
      song.actions.SEQUENCES_UPDATED,
    ], updateSequences),
    takeEvery(song.actions.BPM_SET, setBPM),
    takeEvery(song.actions.SEQUENCE_CLOSED, loopSong),
    takeEvery(song.actions.SEQUENCE_OPENED, loopSequence),
    takeEvery(song.actions.SONG_EXTENDED, updateSong),
    takeEvery(song.actions.SONG_LOADED, initialize),
    takeEvery(song.actions.SONG_SHORTENED, updateSong),
    takeEvery(shortcuts.actions.PLAYBACK_STOP, stop),
    takeEvery(shortcuts.actions.PLAYBACK_TOGGLE, togglePlayPause),
  ];
}

function createSequence(songSequence, ...rest) {
  const sequence = new Tone.Sequence(...rest);
  const start = helpers.measuresToTime(songSequence.position);
  sequence.loop = false;
  sequence.start(start);
  return sequence;
}

function songSequenceStepsChannelFactory(measureCount) {
  return eventChannel(emit => {
    const sequence = new Tone.Sequence(
      (time, step) => {
        emit(actions.songSequenceStepTriggered({ step, time }));
      },
      _.range(measureCount * 32),
      '32n',
    );
    sequence.loop = false;
    sequence.start('0');
    setTimeout(() => emit(actions.songSequenceSet(sequence)));
  });
}

function sequenceStepsChannelFactory(songSequences) {
  return eventChannel(emit => {
    const sequences = songSequences.map(sequence => createSequence(
      sequence,
      (time, step) => {
        emit(actions.sequenceStepTriggered({ sequence, step, time }));
      },
      _.range(sequence.measureCount * 32),
      '32n'
    ));

    setTimeout(() => emit(actions.sequencesSet(sequences)));
  });
}
