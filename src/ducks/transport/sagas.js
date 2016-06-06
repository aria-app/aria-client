import Tone from 'tone';
import { takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import playing from 'ducks/playing';
import song from 'ducks/song';
import * as actionTypes from './action-types';
import * as effects from './effects';
import * as selectors from './selectors';

function* pause() {
  if (Tone.Transport.state !== 'paused') {
    yield call(() => {
      Tone.Transport.pause();
    });

    yield put(playing.actions.releaseAll());
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

function* setBPM(action) {
  yield call(() => {
    Tone.Transport.bpm.value = action.bpm;
  });
}

function* stop() {
  if (Tone.Transport.state !== 'stopped') {
    yield call(() => {
      Tone.Transport.stop();
    });

    yield put(playing.actions.releaseAll());
  }
}

function* updateLooping() {
  yield put(effects.updateLooping());
}

export default function* saga() {
  yield [
    takeEvery(actionTypes.PLAY, play),
    takeEvery(actionTypes.PAUSE, pause),
    takeEvery(actionTypes.STOP, stop),
    takeEvery(song.actionTypes.CLOSE_SEQUENCE, updateLooping),
    takeEvery(song.actionTypes.OPEN_SEQUENCE, updateLooping),
    takeEvery(song.actionTypes.DECREMENT_MEASURE_COUNT, updateLooping),
    takeEvery(song.actionTypes.INCREMENT_MEASURE_COUNT, updateLooping),
    takeEvery(song.actionTypes.SET_BPM, setBPM),
  ];
}
