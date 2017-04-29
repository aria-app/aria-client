import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import appData from '../app-data';
import shared from '../shared';
import song from '../song';

const { createSong } = song.helpers;

function* initialize() {
  const localStorageSong = localStorage.getItem(
    shared.constants.localStorageKey,
  );

  const initialSong = localStorageSong
    ? JSON.parse(localStorageSong)
    : createSong();

  yield put(appData.actions.songLoaded({
    song: initialSong,
  }));
}

export default function* saga() {
  yield [
    takeEvery(shared.actions.INITIALIZED, initialize),
  ];
}
