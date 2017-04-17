import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import song from '../song';
import appData from '../app-data';

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

function* loadSongFromFile({ payload }) {
  const data = yield call(getFileContents, payload);
  try {
    const obj = JSON.parse(data);
    yield put(song.actions.songLoaded(obj));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e.stack);
  }
}

export default function* saga() {
  yield [
    takeEvery(appData.actions.FILE_DROPPED, loadSongFromFile),
  ];
}
