import { takeEvery } from 'redux-saga';
import { call } from 'redux-saga/effects';
import appData from '../../app-data';
import dawww from '../dawww';

function* stop() {
  yield call(dawww.stop);
}

export default function* () {
  yield [
    takeEvery(appData.actions.PLAYBACK_STOP_REQUESTED, stop),
  ];
}
