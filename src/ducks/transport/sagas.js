import Tone from 'tone';
import { takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import playing from 'ducks/playing';
import song from 'ducks/song';
import * as actionTypes from './action-types';
import * as selectors from './selectors';

function* pause() {
  yield call(() => {
    Tone.Transport.pause();
  });
  yield put(playing.effects.releaseAll());
}

function* play() {
  if (Tone.Transport.state === 'stopped') {
    const startPoint = yield select(selectors.getStartPoint);
    yield call(() => {
      Tone.Transport.start(null, startPoint);
    });
  } else {
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
  yield call(() => {
    Tone.Transport.stop();
  });
  yield put(playing.effects.releaseAll());
}

export default function* saga() {
  yield [
    takeEvery(actionTypes.PLAY, play),
    takeEvery(actionTypes.PAUSE, pause),
    takeEvery(actionTypes.STOP, stop),
    takeEvery(song.actionTypes.SET_BPM, setBPM),
  ];
}
