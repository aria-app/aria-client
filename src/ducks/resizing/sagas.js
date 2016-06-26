import _ from 'lodash';
import { takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import notes from 'ducks/notes';
import sequencing from 'ducks/sequencing';
import shared from 'ducks/shared';
import * as actions from './actions';
import * as actionTypes from './action-types';
import * as helpers from './helpers';
import * as selectors from './selectors';

function* start() {
  const startPoint = yield select(sequencing.selectors.getMousePoint);
  yield put(notes.actions.pushUndo());
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
  const newPoint = yield select(sequencing.selectors.getMousePoint);
  const previousPoint = yield select(selectors.getNewPoint);

  if (_.isEmpty(previousPoint)) {
    yield put(actions.newPointSet(newPoint));
    return;
  }

  if (_.isEqual(previousPoint, newPoint)) return;

  const change = helpers.getPointOffset(previousPoint, newPoint);

  yield put(notes.actions.selectedNotesSizeChanged(change));

  yield put(actions.newPointSet(newPoint));
}

export default function* saga() {
  yield [
    takeEvery(actionTypes.STARTED, start),
    takeEvery(actionTypes.UPDATED, update),
  ];
}
