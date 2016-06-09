import _ from 'lodash';
import { takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import notes from 'ducks/notes';
import sequencing from 'ducks/sequencing';
import shared from 'ducks/shared';
import song from 'ducks/song';
import * as actions from './actions';
import * as actionTypes from './action-types';
import * as helpers from './helpers';
import * as selectors from './selectors';

function* start({ isAdditive }) {
  const startPoint = yield select(sequencing.selectors.getMousePoint);
  yield put(actions.setNewPoint(startPoint));
  yield put(actions.setStartPoint(startPoint));
  if (!isAdditive) {
    yield put(notes.actions.selectNotes([]));
  }
  //eslint-disable-next-line
  while(true) {
    yield call(shared.helpers.resolveOnMouseUp);
    const isSelecting = yield select(selectors.getIsSelecting);
    if (isSelecting) {
      yield put(actions.stop());
    }
  }
}

function* update({ isAdditive }) {
  const newPoint = yield select(sequencing.selectors.getMousePoint);
  const previousPoint = yield select(selectors.getNewPoint);

  if (_.isEqual(previousPoint, newPoint)) return;

  const startPoint = yield select(selectors.getStartPoint);
  const allNotes = yield select(song.selectors.getActiveSequenceNotes);
  const selectedNotes = yield select(notes.selectors.getSelectedNotes);
  const notesToSelect = helpers.getNotesInFence(startPoint, newPoint, allNotes);

  if (_.isEqual(notesToSelect, selectedNotes)) {
    yield put(actions.setNewPoint(newPoint));
    return;
  }

  if (isAdditive) {
    yield put(notes.actions.selectNotes([
      ...selectedNotes,
      ...notesToSelect,
    ]));
  } else {
    yield put(notes.actions.selectNotes(notesToSelect));
  }

  yield put(actions.setNewPoint(newPoint));
}

export default function* saga() {
  yield [
    takeEvery(actionTypes.START, start),
    takeEvery(actionTypes.UPDATE, update),
  ];
}
