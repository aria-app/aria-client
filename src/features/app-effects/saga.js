import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import appData from '../app-data';
import shared from '../shared';
import song from '../song';

function* initialize() {
  const localStorageSong = localStorage.getItem(
    shared.constants.localStorageKey,
  );

  const initialSong = localStorageSong
    ? JSON.parse(localStorageSong)
    : song.sampleSong;

  yield put(appData.actions.songLoaded(initialSong));
}

export default function* saga() {
  yield [
    takeEvery(shared.actions.INITIALIZED, initialize),
  ];
}
