import { takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import shared from 'ducks/shared';
import * as actions from './actions';
import * as actionTypes from './action-types';
import * as helpers from './helpers';
import * as selectors from './selectors';

function* start({ e, scrollLeftElement, scrollTopElement }) {
  const startPoint = helpers.getStartPoint(scrollLeftElement, scrollTopElement, e);
  yield put(actions.setStartPoint(startPoint));
  //eslint-disable-next-line
  while(true) {
    yield call(shared.helpers.resolveOnMouseUp);
    const isPanning = yield select(selectors.getIsPanning);
    if (isPanning) {
      yield put(actions.stop());
    }
  }
}

function* update({ e, scrollLeftElement, scrollTopElement }) {
  const startPoint = yield select(selectors.getStartPoint);
  helpers.panScrollContainer(scrollLeftElement, scrollTopElement, e, startPoint);
}

export default function* saga() {
  yield [
    takeEvery(actionTypes.START, start),
    takeEvery(actionTypes.UPDATE, update),
  ];
}
