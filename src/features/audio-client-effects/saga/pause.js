import { takeEvery } from 'redux-saga';
import { call } from 'redux-saga/effects';
import appData from '../../app-data';
import dawww from '../dawww';

function* pause() {
  yield call(dawww.pause);
}

export default function* () {
  yield [
    takeEvery(appData.actions.PLAYBACK_PAUSE_REQUESTED, pause),
  ];
}
