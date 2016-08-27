import _ from 'lodash';
import { takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import Tone from 'tone';
import playing from 'ducks/playing';
import shortcuts from 'ducks/shortcuts';
import song from 'ducks/song';
import * as actions from './actions';
import * as actionTypes from './action-types';
import * as constants from './constants';
import * as effects from './effects';
import * as helpers from './helpers';
import * as selectors from './selectors';

const { STARTED } = constants.playbackStates;

function* initialize() {
  yield put(actions.sequencesUpdated());
  yield* updateSong();
}

function* loopSequence() {
  const { measureCount, position } = yield select(song.selectors.getActiveSequence);
  const start = helpers.measuresToTime(position);
  const end = helpers.measuresToTime(position + measureCount);
  yield put(actions.startPointSet(`+${start}`));
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
  yield put(actions.startPointSet(0));
  Tone.Transport.setLoopPoints(0, end);
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
    yield call(() => {
      Tone.Transport.start(null, startPoint);
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
  yield put(effects.createSequences());
}

function* updateSong() {
  yield* updateSongSequence();
  yield* loopSong();
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
  yield put(effects.createSongSequence());
}

export default function* saga() {
  yield [
    takeEvery(actionTypes.PLAYBACK_STARTED, play),
    takeEvery(actionTypes.PLAYBACK_PAUSED, pause),
    takeEvery(actionTypes.PLAYBACK_STOPPED, stop),
    takeEvery(actionTypes.PLAYBACK_TOGGLED, togglePlayPause),
    takeEvery(actionTypes.SEQUENCE_STEP_TRIGGERED, sequenceStep),
    takeEvery(actionTypes.SONG_SEQUENCE_STEP_TRIGGERED, songSequenceStep),
    takeEvery(actionTypes.TRANSPORT_POSITION_SET, setTransportPosition),
    takeEvery([
      actionTypes.SEQUENCES_UPDATED,
      song.actionTypes.SEQUENCE_EXTENDED,
      song.actionTypes.SEQUENCE_NUDGED_LEFT,
      song.actionTypes.SEQUENCE_NUDGED_RIGHT,
      song.actionTypes.SEQUENCE_SHORTENED,
      song.actionTypes.SEQUENCES_ADDED,
      song.actionTypes.SEQUENCES_DELETED,
      song.actionTypes.SEQUENCES_SET,
      song.actionTypes.SEQUENCES_UPDATED,
    ], updateSequences),
    takeEvery(song.actionTypes.BPM_SET, setBPM),
    takeEvery(song.actionTypes.SEQUENCE_CLOSED, loopSong),
    takeEvery(song.actionTypes.SEQUENCE_OPENED, loopSequence),
    takeEvery(song.actionTypes.SONG_EXTENDED, updateSong),
    takeEvery(song.actionTypes.SONG_LOADED, initialize),
    takeEvery(song.actionTypes.SONG_SHORTENED, updateSong),
    takeEvery(shortcuts.actionTypes.PLAYBACK_STOP, stop),
    takeEvery(shortcuts.actionTypes.PLAYBACK_TOGGLE, togglePlayPause),
  ];
}
