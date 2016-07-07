import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import shortcuts from '../shortcuts';
import * as actionTypes from './action-types';

function* initialize() {
  yield put(shortcuts.actions.initialized());
}

export default function* saga() {
  yield [
    takeEvery(actionTypes.INITIALIZED, initialize),
  ];
}
