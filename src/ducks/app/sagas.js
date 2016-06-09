import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import shortcuts from 'ducks/shortcuts';
import * as actionTypes from './action-types';

function* initialize() {
  yield put(shortcuts.actions.initialize());
}

export default function* saga() {
  yield [
    takeEvery(actionTypes.INITIALIZE, initialize),
  ];
}
