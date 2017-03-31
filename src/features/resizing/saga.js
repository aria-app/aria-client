import { isEmpty } from 'lodash/fp';
import { takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import shared from '../shared';
import song from '../song';
import * as actions from './actions';
import * as selectors from './selectors';

function* start({ point }) {
  yield put(song.actions.undoPushed());
  yield put(actions.newPointSet(point));
  let started = true;
  while (started) {
    yield call(shared.helpers.resolveOnMouseUp);
    const isResizing = yield select(selectors.getIsResizing);
    if (isResizing) {
      yield put(actions.stopped());
      started = false;
    }
  }
}

function* update({ point }) {
  const previousPoint = yield select(selectors.getNewPoint);

  if (isEmpty(previousPoint)) {
    yield put(actions.newPointSet(point));
    return;
  }

  const change = shared.helpers.getPointOffset(previousPoint, point);

  yield put(song.actions.selectedNotesSizeChanged(change));

  yield put(actions.newPointSet(point));
}

export default function* saga() {
  yield [
    takeEvery(actions.STARTED, start),
    takeEvery(actions.UPDATED, update),
  ];
}
