import { isEmpty, isEqual } from 'lodash/fp';
import { takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import notes from '../notes';
import sequencingPosition from '../sequencing-position';
import shared from '../shared';
import * as actions from './actions';
import * as selectors from './selectors';

function* start() {
  const startPoint = yield select(sequencingPosition.selectors.getMousePoint);
  yield put(notes.actions.undoPushed());
  yield put(actions.newPointSet(startPoint));
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

function* update() {
  const newPoint = yield select(sequencingPosition.selectors.getMousePoint);
  const previousPoint = yield select(selectors.getNewPoint);

  if (isEmpty(previousPoint)) {
    yield put(actions.newPointSet(newPoint));
    return;
  }

  if (isEqual(previousPoint, newPoint)) return;

  const change = shared.helpers.getPointOffset(previousPoint, newPoint);

  yield put(notes.actions.selectedNotesSizeChanged(change));

  yield put(actions.newPointSet(newPoint));
}

export default function* saga() {
  yield [
    takeEvery(actions.STARTED, start),
    takeEvery(actions.UPDATED, update),
  ];
}
