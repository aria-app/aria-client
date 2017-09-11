import { takeEvery } from 'redux-saga';
import { call } from 'redux-saga/effects';
import appData from '../../app-data';
import dawww from '../dawww';

function* start() {
  yield call(dawww.start);
}

export default function* () {
  yield [
    takeEvery(appData.actions.PLAYBACK_START_REQUESTED, start),
  ];
}
