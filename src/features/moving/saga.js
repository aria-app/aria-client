import _ from 'lodash';
import { takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import notes from '../notes';
import sequencingPosition from '../sequencing-position';
import shared from '../shared';
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

function* update() {
  const newPoint = yield select(sequencingPosition.selectors.getMousePoint);
  const previousPoint = yield select(selectors.getNewPoint);

  if (_.isEmpty(previousPoint)) {
    yield put(notes.actions.undoPushed());
    yield put(actions.newPointSet(newPoint));
    return;
  }

  if (_.isEqual(previousPoint, newPoint)) return;

  const offset = shared.helpers.getPointOffset(previousPoint, newPoint);

  yield put(notes.actions.selectedNotesMoved(offset));

  yield put(actions.newPointSet(newPoint));
}

export default function* saga() {
  yield [
    takeEvery(actions.STARTED, start),
    takeEvery(actions.UPDATED, update),
  ];
}
