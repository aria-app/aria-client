import { takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import shared from '../shared';
import * as actions from './actions';
import * as helpers from './helpers';
import * as selectors from './selectors';

function* start({ e, scrollLeftElement, scrollTopElement }) {
  const startPoint = helpers.getStartPoint(scrollLeftElement, scrollTopElement, e);
  yield put(actions.startPointSet(startPoint));
  //eslint-disable-next-line
  while(true) {
    yield call(shared.helpers.resolveOnMouseUp);
    const isPanning = yield select(selectors.getIsPanning);
    if (isPanning) {
      yield put(actions.stopped());
    }
  }
}

function* update({ e, scrollLeftElement, scrollTopElement }) {
  const startPoint = yield select(selectors.getStartPoint);
  helpers.panScrollContainer(scrollLeftElement, scrollTopElement, e, startPoint);
}

export default function* saga() {
  yield [
    takeEvery(actions.STARTED, start),
    takeEvery(actions.UPDATED, update),
  ];
}
