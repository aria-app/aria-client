import _ from 'lodash';
import { takeEvery } from 'redux-saga';
import { put, select } from 'redux-saga/effects';
import playing from 'ducks/playing';
import sequencing from 'ducks/sequencing';
import shortcuts from 'ducks/shortcuts';
import song from 'ducks/song';
import * as actions from './actions';
import * as actionTypes from './action-types';
import * as helpers from './helpers';
import * as selectors from './selectors';

function* changeSelectedNotesSize({ change }) {
  const selectedNotes = yield select(selectors.getSelectedNotes);
  yield put(actions.resize(selectedNotes, change));
}

function* draw() {
  const activeSequenceId = yield select(song.selectors.getActiveSequenceId);
  const point = yield select(sequencing.selectors.getMousePoint);

  yield put(playing.actions.previewNote(point));
  yield put(song.actions.addNote(song.helpers.createNote({
    points: [point, { x: point.x + 1, y: point.y }],
    sequenceId: activeSequenceId,
  })));
}

function* duplicate() {
  const selectedNotes = yield select(selectors.getSelectedNotes);

  if (_.isEmpty(selectedNotes)) return;

  const newNotes = selectedNotes.map(note => song.helpers.createNote({
    points: note.points,
    sequenceId: note.sequenceId,
  }));

  yield put(song.actions.addNotes(newNotes));
  yield put(actions.selectNotes(newNotes));
}

function* erase(action) {
  yield put(actions.remove([action.note]));
}

function* move({ notes, offset }) {
  const measureCount = yield select(song.selectors.getActiveSequenceMeasureCount);
  const updatedNotes = notes.map(note => ({
    ...note,
    points: note.points.map(point => helpers.addPoints(point, offset)),
  }));

  if (
    (helpers.somePointOutside(_.map(updatedNotes, n => n.points[0]), measureCount)) ||
    (helpers.somePointOutside(_.map(updatedNotes, n => n.points[1]), measureCount))
  ) return;

  yield put(playing.actions.previewNote(_.first(updatedNotes[0].points)));
  yield put(song.actions.updateNotes(updatedNotes));
}

function* moveSelected({ offset }) {
  const selectedNotes = yield select(selectors.getSelectedNotes);

  if (_.isEmpty(selectedNotes)) return;

  yield put(actions.move(selectedNotes, offset));
}

function* nudgeSelectedNotesPosition({ change }) {
  const selectedNotes = yield select(selectors.getSelectedNotes);

  if (_.isEmpty(selectedNotes)) return;

  yield put(actions.move(selectedNotes, change));
}

function* nudgeSelectedNotesSize({ change }) {
  yield put(actions.changeSelectedNotesSize({ change }));
}

function* pushRedo() {
  const allNotes = yield select(song.selectors.getActiveSequenceNotes);
  const redos = yield select(selectors.getRedos);

  yield put(actions.setRedos([
    ...redos,
    allNotes,
  ]));
}

function* pushUndo() {
  const allNotes = yield select(song.selectors.getActiveSequenceNotes);
  const undos = yield select(selectors.getUndos);

  if (_.isEqual(_.last(undos), allNotes)) return;

  yield put(actions.setUndos([
    ...undos,
    allNotes,
  ]));
  yield put(actions.setRedos([]));
}

function* redo() {
  const redos = yield select(selectors.getRedos);

  if (_.isEmpty(redos)) return;

  const allNotes = yield select(song.selectors.getActiveSequenceNotes);
  const undos = yield select(selectors.getUndos);

  yield put(actions.setUndos([
    ...undos,
    allNotes,
  ]));
  yield put(song.actions.setNotes(_.last(redos)));
  yield put(actions.setRedos(redos.slice(0, redos.length - 1)));
}

function* remove({ notes }) {
  yield put(song.actions.deleteNotes(notes));
}

function* removeSelected() {
  const selectedNotes = yield select(selectors.getSelectedNotes);
  yield put(actions.remove(selectedNotes));
}

function* resize({ notes, change }) {
  const measureCount = yield select(song.selectors.getActiveSequenceMeasureCount);
  const movingLeft = change.x < 0;
  const anyNoteBent = _.some(notes, n => (_.last(n.points).y - _.first(n.points).y) !== 0);
  const willBeMinLength = _.some(notes, n => (_.last(n.points).x - _.first(n.points).x) <= 1);
  const willBeNegative = _.some(notes, n => (_.last(n.points).x - _.first(n.points).x) <= 0);

  if (
    (movingLeft && anyNoteBent && willBeMinLength) ||
    (movingLeft && willBeNegative) ||
    (change.y !== 0 && _.some(notes, n => (_.last(n.points).x - _.first(n.points).x) === 0))
  ) return;

  const updatedNotes = notes
    .map(note => ({
      ...note,
      points: [
        ...note.points.slice(0, note.points.length - 1),
        helpers.addPoints(_.last(note.points), change),
      ],
    }));

  if (helpers.somePointOutside(_.map(updatedNotes, n => n.points[1]), measureCount)) return;

  yield put(playing.actions.previewNote(_.last(updatedNotes[0].points)));
  yield put(song.actions.updateNotes(updatedNotes));
}

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

  yield put(song.actions.updateNotes(updatedNotes));
}

function* selectAll() {
  const notes = yield select(song.selectors.getActiveSequenceNotes);
  yield put(actions.selectNotes(notes));
}

function* shiftDownOctave() {
  const selectedNotes = yield select(selectors.getSelectedNotes);

  yield put(actions.move(selectedNotes, {
    x: 0,
    y: 12,
  }));
}

function* shiftUpOctave() {
  const selectedNotes = yield select(selectors.getSelectedNotes);

  yield put(actions.move(selectedNotes, {
    x: 0,
    y: -12,
  }));
}

function* undo() {
  const undos = yield select(selectors.getUndos);

  if (_.isEmpty(undos)) return;

  yield put(actions.pushRedo());
  yield put(song.actions.setNotes(_.last(undos)));
  yield put(actions.setUndos(undos.slice(0, undos.length - 1)));
}

export default function* saga() {
  yield [
    takeEvery([
      actionTypes.DRAW,
      actionTypes.DUPLICATE,
      actionTypes.ERASE,
      actionTypes.REMOVE,
      actionTypes.NUDGE_SELECTED_NOTES_POSITION,
      actionTypes.NUDGE_SELECTED_NOTES_SIZE,
      actionTypes.SHIFT_DOWN_OCTAVE,
      actionTypes.SHIFT_UP_OCTAVE,
    ], pushUndo),
    takeEvery(actionTypes.CHANGE_SELECTED_NOTES_SIZE, changeSelectedNotesSize),
    takeEvery(actionTypes.DRAW, draw),
    takeEvery(actionTypes.DUPLICATE, duplicate),
    takeEvery(actionTypes.ERASE, erase),
    takeEvery(actionTypes.MOVE, move),
    takeEvery(actionTypes.MOVE_SELECTED, moveSelected),
    takeEvery(actionTypes.NUDGE_SELECTED_NOTES_POSITION, nudgeSelectedNotesPosition),
    takeEvery(actionTypes.NUDGE_SELECTED_NOTES_SIZE, nudgeSelectedNotesSize),
    takeEvery(actionTypes.PUSH_REDO, pushRedo),
    takeEvery(actionTypes.PUSH_UNDO, pushUndo),
    takeEvery(actionTypes.REDO, redo),
    takeEvery(actionTypes.REMOVE, remove),
    takeEvery(actionTypes.REMOVE_SELECTED, removeSelected),
    takeEvery(actionTypes.RESIZE, resize),
    takeEvery(actionTypes.RESIZE_SELECTED, resizeSelected),
    takeEvery(actionTypes.SELECT_ALL, selectAll),
    takeEvery(actionTypes.SHIFT_DOWN_OCTAVE, shiftDownOctave),
    takeEvery(actionTypes.SHIFT_UP_OCTAVE, shiftUpOctave),
    takeEvery(actionTypes.UNDO, undo),
    takeEvery(shortcuts.actionTypes.REDO, redo),
    takeEvery(shortcuts.actionTypes.UNDO, undo),
  ];
}
