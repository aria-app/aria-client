import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import appData from '../app-data';
import shared from '../shared';
import song from '../song';

const reader = new FileReader();

function getFileContents(file) {
  return new Promise((resolve) => {
    reader.onload = (e) => {
      const data = e.target.result;
      reader.onload = undefined;
      resolve(data);
    };
    reader.readAsText(file);
  });
}

function* initialize() {
  const localStorageSong = localStorage.getItem(
    shared.constants.localStorageKey,
  );

  const initialSong = localStorageSong
    ? JSON.parse(localStorageSong)
    : song.sampleSong;

  yield put(appData.actions.songLoaded(initialSong));
}

function* loadSongFromFile({ payload }) {
  const data = yield call(getFileContents, payload);
  try {
    const songObject = JSON.parse(data);
    yield put(appData.actions.songLoaded(songObject));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e.stack);
  }
}

export default function* saga() {
  yield [
    takeEvery(appData.actions.FILE_DROPPED, loadSongFromFile),
    takeEvery(shared.actions.INITIALIZED, initialize),
  ];
}
