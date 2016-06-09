import _ from 'lodash';
import { takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import notes from 'ducks/notes';
import sequencer from 'ducks/sequencer';
import * as actions from './actions';
import * as actionTypes from './action-types';
import * as helpers from './helpers';
import * as selectors from './selectors';

function* start() {
  yield put(actions.setIsMoving(true));
  //eslint-disable-next-line
  while(true) {
    yield call(mouseUpPromise);
    const isMoving = yield select(selectors.getIsMoving);
    if (isMoving) {
      yield put(actions.stop());
    }
  }
}

function* stop() {
  const isMoving = yield select(selectors.getIsMoving);
  if (!isMoving) return;
  yield put(actions.setIsMoving(false));
  yield put(actions.setNewPoint(undefined));
}

function* update() {
  const newPoint = yield select(sequencer.selectors.getMousePoint);
  const previousPoint = yield select(selectors.getNewPoint);

  if (!previousPoint) {
    yield put(notes.actions.pushUndo());
    yield put(actions.setNewPoint(newPoint));
    return;
  }

  if (_.isEqual(previousPoint, newPoint)) return;

  const offset = helpers.getPointOffset(previousPoint, newPoint);

  yield put(notes.actions.moveSelected(offset));

  yield put(actions.setNewPoint(newPoint));
}

export default function* saga() {
  yield [
    takeEvery(actionTypes.START, start),
    takeEvery(actionTypes.STOP, stop),
    takeEvery(actionTypes.UPDATE, update),
  ];
}

function mouseUpPromise() {
  return new Promise(resolve => {
    window.addEventListener('mouseup', doResolve, false);
    function doResolve() {
      window.removeEventListener('mouseup', doResolve, false);
      resolve();
    }
  });
}
