import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import shared from '../shared';
import shortcuts from '../shortcuts';
import song from '../song';
import * as actionTypes from './action-types';

const reader = new FileReader();

function getFileContents(file) {
  return new Promise(resolve => {
    reader.onload = e => {
      const data = e.target.result;
      reader.onload = undefined;
      resolve(data);
    };
    reader.readAsText(file);
  });
}

function* loadSongFromFile({ file }) {
  const data = yield call(getFileContents, file);
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
    takeEvery(actionTypes.FILE_DROPPED, loadSongFromFile),
  ];
}
