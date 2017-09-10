import { takeEvery } from 'redux-saga';
import { call } from 'redux-saga/effects';
import appData from '../../app-data';
import dawww from '../dawww';

export function* request({ song }) {
  yield call(dawww.updateSong, song);
}

export default function* () {
  yield [
    takeEvery([
      appData.actions.SONG_LOADED,
    ], request),
  ];
}
