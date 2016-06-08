import _ from 'lodash';
import { takeEvery } from 'redux-saga';
import { put, select } from 'redux-saga/effects';
import song from 'ducks/song';
import * as actions from './actions';
import * as actionTypes from './action-types';
import * as selectors from './selectors';

function* resizeSelected(action) {
  const selectedNotes = yield select(selectors.getSelectedNotes);
  const updatedNotes = selectedNotes.map(note => ({
    ...note,
    points: [
      ...note.points.slice(0, note.points.length - 1),
      {
        x: _.first(note.points).x + action.size - 1,
        y: _.first(note.points).y,
      },
    ],
  }));

  yield put(actions.pushUndo());
  yield put(song.actions.updateNotes(updatedNotes));
}

export default function* saga() {
  yield [
    takeEvery(actionTypes.RESIZE_SELECTED, resizeSelected),
  ];
}
