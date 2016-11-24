import _ from 'lodash';
import { takeEvery } from 'redux-saga';
import { put, select } from 'redux-saga/effects';
import playing from '../playing';
import sequencingPosition from '../sequencing-position';
import shortcuts from '../shortcuts';
import song from '../song';
import * as actions from './actions';
import * as helpers from './helpers';
import * as selectors from './selectors';

function* changeSelectedNotesSize({ change }) {
  const selectedNotes = yield select(selectors.getSelectedNotes);

  if (_.isEmpty(selectedNotes)) return;

  yield put(actions.notesResized(selectedNotes, change));
}

function* drawNote() {
  const activeSequenceId = yield select(song.selectors.getActiveSequenceId);
  const point = yield select(sequencingPosition.selectors.getMousePoint);

  yield put(playing.actions.notePreviewed(point));
  yield put(song.actions.notesAdded([
    song.helpers.createNote({
      points: [point, { x: point.x + 1, y: point.y }],
      sequenceId: activeSequenceId,
    }),
  ]));
}

function* duplicateSelectedNotes() {
  const selectedNotes = yield select(selectors.getSelectedNotes);

  if (_.isEmpty(selectedNotes)) return;

  const newNotes = selectedNotes.map(note => song.helpers.createNote({
    points: note.points,
    sequenceId: note.sequenceId,
  }));

  yield put(song.actions.notesAdded(newNotes));
  yield put(actions.notesSelected(newNotes));
}

function* erase(action) {
  yield put(actions.notesDeleted([action.note]));
}

function* moveNotes({ notes, offset }) {
  const measureCount = yield select(song.selectors.getActiveSequenceMeasureCount);
  const updatedNotes = notes.map(note => ({
    ...note,
    points: note.points.map(point => helpers.addPoints(point, offset)),
  }));

  if (
    (helpers.somePointOutside(_.map(updatedNotes, n => n.points[0]), measureCount)) ||
    (helpers.somePointOutside(_.map(updatedNotes, n => n.points[1]), measureCount))
  ) return;

  yield put(playing.actions.notePreviewed(_.first(updatedNotes[0].points)));
  yield put(song.actions.notesUpdated(updatedNotes));
}

function* moveSelected({ offset }) {
  const selectedNotes = yield select(selectors.getSelectedNotes);

  if (_.isEmpty(selectedNotes)) return;

  yield put(actions.notesMoved(selectedNotes, offset));
}

function* nudgeSelectedNotesPosition({ change }) {
  const selectedNotes = yield select(selectors.getSelectedNotes);

  if (_.isEmpty(selectedNotes)) return;

  yield put(actions.notesMoved(selectedNotes, change));
}

function* nudgeSelectedNotesSize({ change }) {
  yield put(actions.selectedNotesSizeChanged(change));
}

function* pushRedo() {
  const allNotes = yield select(song.selectors.getNotes);
  const redos = yield select(selectors.getRedos);
  yield put(actions.redosSet([
    ...redos,
    allNotes,
  ]));
}

function* pushUndo() {
  const allNotes = yield select(song.selectors.getNotes);
  const undos = yield select(selectors.getUndos);

  if (_.isEqual(_.last(undos), allNotes)) return;

  yield put(actions.undosSet([
    ...undos,
    allNotes,
  ]));
  yield put(actions.redosSet([]));
}

function* redo() {
  const redos = yield select(selectors.getRedos);

  if (_.isEmpty(redos)) return;

  const allNotes = yield select(song.selectors.getActiveSequenceNotes);
  const undos = yield select(selectors.getUndos);

  yield put(actions.undosSet([
    ...undos,
    allNotes,
  ]));
  yield put(song.actions.notesSet(_.last(redos)));
  yield put(actions.redosSet(redos.slice(0, redos.length - 1)));
}

function* deleteNotes({ notes }) {
  yield put(song.actions.notesDeleted(_.map(notes, 'id')));
}

function* deleteSelectedNotes() {
  const selectedNotes = yield select(selectors.getSelectedNotes);

  if (_.isEmpty(selectedNotes)) return;

  yield put(actions.notesDeleted(selectedNotes));
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

  yield put(playing.actions.notePreviewed(_.last(updatedNotes[0].points)));
  yield put(song.actions.notesUpdated(updatedNotes));
}

function* resizeSelected(action) {
  const selectedNotes = yield select(selectors.getSelectedNotes);

  if (_.isEmpty(selectedNotes)) return;

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

  yield put(song.actions.notesUpdated(updatedNotes));
}

function* selectAll() {
  const notes = yield select(song.selectors.getActiveSequenceNotes);

  if (_.isEmpty(notes)) return;

  yield put(actions.notesSelected(notes));
}

function* shiftDownOctave() {
  const selectedNotes = yield select(selectors.getSelectedNotes);

  if (_.isEmpty(selectedNotes)) return;

  yield put(actions.notesMoved(selectedNotes, {
    x: 0,
    y: 12,
  }));
}

function* shiftUpOctave() {
  const selectedNotes = yield select(selectors.getSelectedNotes);

  if (_.isEmpty(selectedNotes)) return;

  yield put(actions.notesMoved(selectedNotes, {
    x: 0,
    y: -12,
  }));
}

function* undo() {
  const undos = yield select(selectors.getUndos);

  if (_.isEmpty(undos)) return;

  const lastUndo = _.last(undos);

  yield put(actions.redoPushed());
  yield put(song.actions.notesSet(lastUndo));
  yield put(actions.undosSet(_.without(undos, lastUndo)));
}

export default function* saga() {
  yield [
    takeEvery(actions.NOTE_DRAWN, pushUndo),
    takeEvery(actions.NOTE_ERASED, pushUndo),
    takeEvery(actions.NOTES_DUPLICATED, pushUndo),
    takeEvery(actions.NOTES_DELETED, pushUndo),
    takeEvery(actions.SELECTED_NOTES_MOVED_OCTAVE_DOWN, pushUndo),
    takeEvery(actions.SELECTED_NOTES_MOVED_OCTAVE_UP, pushUndo),
    takeEvery(actions.SELECTED_NOTES_POSITION_NUDGED, pushUndo),
    takeEvery(actions.SELECTED_NOTES_SIZE_NUDGED, pushUndo),
    takeEvery(actions.ALL_NOTES_SELECTED, selectAll),
    takeEvery(actions.NOTE_DRAWN, drawNote),
    takeEvery(actions.NOTE_ERASED, erase),
    takeEvery(actions.NOTES_DUPLICATED, duplicateSelectedNotes),
    takeEvery(actions.NOTES_MOVED, moveNotes),
    takeEvery(actions.NOTES_DELETED, deleteNotes),
    takeEvery(actions.NOTES_RESIZED, resize),
    takeEvery(actions.REDO_POPPED, redo),
    takeEvery(actions.REDO_PUSHED, pushRedo),
    takeEvery(actions.SELECTED_NOTES_MOVED, moveSelected),
    takeEvery(actions.SELECTED_NOTES_MOVED_OCTAVE_DOWN, shiftDownOctave),
    takeEvery(actions.SELECTED_NOTES_MOVED_OCTAVE_UP, shiftUpOctave),
    takeEvery(actions.SELECTED_NOTES_POSITION_NUDGED, nudgeSelectedNotesPosition),
    takeEvery(actions.SELECTED_NOTES_DELETED, deleteSelectedNotes),
    takeEvery(actions.SELECTED_NOTES_RESIZED, resizeSelected),
    takeEvery(actions.SELECTED_NOTES_SIZE_CHANGED, changeSelectedNotesSize),
    takeEvery(actions.SELECTED_NOTES_SIZE_NUDGED, nudgeSelectedNotesSize),
    takeEvery(actions.UNDO_POPPED, undo),
    takeEvery(actions.UNDO_PUSHED, pushUndo),
    takeEvery(shortcuts.actions.DELETE, deleteSelectedNotes),
    takeEvery(shortcuts.actions.DESELECT, deleteSelectedNotes),
    takeEvery(shortcuts.actions.DUPLICATE, duplicateSelectedNotes),
    takeEvery(shortcuts.actions.NUDGE_ALT_DOWN,
      () => nudgeSelectedNotesSize({ change: { x: 0, y: 1 } })
    ),
    takeEvery(shortcuts.actions.NUDGE_ALT_LEFT,
      () => nudgeSelectedNotesSize({ change: { x: -1, y: 0 } })
    ),
    takeEvery(shortcuts.actions.NUDGE_ALT_RIGHT,
      () => nudgeSelectedNotesSize({ change: { x: 1, y: 0 } })
    ),
    takeEvery(shortcuts.actions.NUDGE_ALT_UP,
      () => nudgeSelectedNotesSize({ change: { x: 0, y: -1 } })
    ),
    takeEvery(shortcuts.actions.NUDGE_DOWN,
      () => nudgeSelectedNotesPosition({ change: { x: 0, y: 1 } })
    ),
    takeEvery(shortcuts.actions.NUDGE_LEFT,
      () => nudgeSelectedNotesPosition({ change: { x: -1, y: 0 } })
    ),
    takeEvery(shortcuts.actions.NUDGE_RIGHT,
      () => nudgeSelectedNotesPosition({ change: { x: 1, y: 0 } })
    ),
    takeEvery(shortcuts.actions.NUDGE_UP,
      () => nudgeSelectedNotesPosition({ change: { x: 0, y: -1 } })
    ),
    takeEvery(shortcuts.actions.REDO, redo),
    takeEvery(shortcuts.actions.SELECT_ALL, selectAll),
    takeEvery(shortcuts.actions.UNDO, undo),
  ];
}
