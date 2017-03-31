import { isEmpty } from 'lodash/fp';
import { takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import shared from '../shared';
import song from '../song';
import * as actions from './actions';
import * as selectors from './selectors';

function* start() {
  //eslint-disable-next-line
  while(true) {
    yield call(shared.helpers.resolveOnMouseUp);
    const isMoving = yield select(selectors.getIsMoving);
    if (isMoving) {
      yield put(actions.stopped());
    }
  }
}

function* update({ point }) {
  const previousPoint = yield select(selectors.getNewPoint);

  if (isEmpty(previousPoint)) {
    yield put(song.actions.undoPushed());
    yield put(actions.newPointSet(point));
    return;
  }

  const offset = shared.helpers.getPointOffset(previousPoint, point);

  yield put(song.actions.selectedNotesMoved(offset));

  yield put(actions.newPointSet(point));
}

export default function* saga() {
  yield [
    takeEvery(actions.STARTED, start),
    takeEvery(actions.UPDATED, update),
  ];
}
