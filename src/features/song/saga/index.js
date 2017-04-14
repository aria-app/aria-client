import { first, isEmpty, isEqual, last, map, throttle, without } from 'lodash/fp';
import { takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import sequenceData from '../../sequence-data';
import shared from '../../shared';
import shortcuts from '../../shortcuts';
import * as actions from '../actions';
import * as helpers from '../helpers';
import * as selectors from '../selectors';
import sampleSong from '../sample-song';

function* createAndAddTrack() {
  const track = helpers.createTrack();
  yield put(actions.tracksAdded([track]));
  yield put(actions.sequencesAdded([
    helpers.createSequence({
      measureCount: 1,
      position: 0,
      trackId: track.id,
    }),
  ]));
}

function* addSequenceToTrack({ position, id }) {
  yield put(actions.sequencesAdded([
    helpers.createSequence({
      measureCount: 1,
      trackId: id,
      position,
    }),
  ]));
}

function* deleteSequencesFromTracks({ ids }) {
  const sequences = yield select(selectors.getSequencesByTrackIds(ids));
  const sequenceIds = map('id')(sequences);

  yield put(actions.sequencesDeleted(sequenceIds));
}

function* initialize() {
  const localStorageSong = localStorage.getItem(
    shared.constants.localStorageKey,
  );

  const initialSong = localStorageSong
    ? JSON.parse(localStorageSong)
    : sampleSong;

  yield put(actions.songLoaded(initialSong));
}

const throttledSave = throttle(500)((song) => {
  localStorage.setItem(shared.constants.localStorageKey, JSON.stringify(song));
});

function* saveToLocalStorage() {
  const song = yield select(selectors.getSong);
  throttledSave(song);
}

function* deleteSelectedNotes() {
  const selectedNotes = yield select(selectors.getSelectedNotes);

  if (isEmpty(selectedNotes)) return;

  yield put(actions.notesDeleted(selectedNotes));
}

function* duplicateSelectedNotes() {
  const selectedNotes = yield select(selectors.getSelectedNotes);

  if (isEmpty(selectedNotes)) return;

  const newNotes = selectedNotes.map(note => helpers.createNote({
    points: note.points,
    sequenceId: note.sequenceId,
  }));

  yield put(actions.notesAdded(newNotes));
}

function* moveNotes({ notes, offset }) {
  const measureCount = yield select(selectors.getActiveSequenceMeasureCount);
  const updatedNotes = notes.map(note => ({
    ...note,
    points: note.points.map(point => helpers.addPoints(point, offset)),
  }));

  if (
    (helpers.getIsSomePointOutside(map(n => n.points[0])(updatedNotes), measureCount)) ||
    (helpers.getIsSomePointOutside(map(n => n.points[1])(updatedNotes), measureCount))
  ) return;

  yield put(actions.notesMoveSucceeded(updatedNotes));
}

function* moveSelected({ offset }) {
  const selectedNotes = yield select(selectors.getSelectedNotes);

  if (isEmpty(selectedNotes)) return;

  yield put(actions.notesMoveStarted(selectedNotes, offset));
}

function* nudgeSelectedNotesPosition({ change }) {
  const selectedNotes = yield select(selectors.getSelectedNotes);

  if (isEmpty(selectedNotes)) return;

  yield call(pushUndo);
  yield put(actions.notesMoveStarted(selectedNotes, change));
}

// function* nudgeSelectedNotesSize({ change }) {
//   yield put(actions.selectedNotesSizeChanged(change));
// }

function* pushRedo() {
  const allNotes = yield select(selectors.getNotes);
  const redos = yield select(selectors.getRedos);
  yield put(actions.redosSet([
    ...redos,
    allNotes,
  ]));
}

function* pushUndo() {
  const allNotes = yield select(selectors.getNotes);
  const undos = yield select(selectors.getUndos);

  if (isEqual(last(undos), allNotes)) return;

  yield put(actions.undosSet([
    ...undos,
    allNotes,
  ]));
  yield put(actions.redosSet([]));
}

function* redo() {
  const redos = yield select(selectors.getRedos);

  if (isEmpty(redos)) return;

  const allNotes = yield select(selectors.getNotes);
  const undos = yield select(selectors.getUndos);

  yield put(actions.undosSet([
    ...undos,
    allNotes,
  ]));
  yield put(actions.notesSet(last(redos)));
  yield put(actions.redosSet(redos.slice(0, redos.length - 1)));
}

function* resizeSelected(action) {
  const selectedNotes = yield select(selectors.getSelectedNotes);

  if (isEmpty(selectedNotes)) return;

  const updatedNotes = selectedNotes.map(note => ({
    ...note,
    points: [
      ...note.points.slice(0, note.points.length - 1),
      {
        x: (first(note.points).x + action.size) - 1,
        y: first(note.points).y,
      },
    ],
  }));

  yield put(actions.notesResizeSucceeded(updatedNotes));
}

function* selectAll() {
  const notes = yield select(selectors.getActiveSequenceNotes);

  if (isEmpty(notes)) return;

  yield put(actions.notesSelected(notes));
}

function* shiftDownOctave() {
  const selectedNotes = yield select(selectors.getSelectedNotes);

  if (isEmpty(selectedNotes)) return;

  yield put(actions.notesMoveStarted(selectedNotes, {
    x: 0,
    y: 12,
  }));
}

function* shiftUpOctave() {
  const selectedNotes = yield select(selectors.getSelectedNotes);

  if (isEmpty(selectedNotes)) return;

  yield put(actions.notesMoveStarted(selectedNotes, {
    x: 0,
    y: -12,
  }));
}

function* undo() {
  const undos = yield select(selectors.getUndos);

  if (isEmpty(undos)) return;

  const lastUndo = last(undos);

  yield put(actions.redoPushed());
  yield put(actions.notesSet(lastUndo));
  yield put(actions.undosSet(without([lastUndo])(undos)));
}

export default function* saga() {
  yield [
    takeEvery(actions.SEQUENCE_ADDED_TO_TRACK, addSequenceToTrack),
    takeEvery(actions.TRACK_CREATED_AND_ADDED, createAndAddTrack),
    takeEvery(actions.TRACKS_DELETED, deleteSequencesFromTracks),
    takeEvery([
      actions.BPM_SET,
      actions.ID_SET,
      actions.MEASURE_COUNT_SET,
      actions.NAME_SET,
      actions.NOTES_ADDED,
      actions.NOTES_DELETED,
      actions.NOTES_DUPLICATED,
      actions.NOTES_MOVE_SUCCEEDED,
      actions.NOTES_SET,
      actions.SEQUENCE_ADDED_TO_TRACK,
      actions.SEQUENCE_EXTENDED,
      actions.SEQUENCE_NUDGED_LEFT,
      actions.SEQUENCE_NUDGED_RIGHT,
      actions.SEQUENCE_OPENED,
      actions.SEQUENCE_SHORTENED,
      actions.SEQUENCES_ADDED,
      actions.SEQUENCES_DELETED,
      actions.SEQUENCES_SET,
      actions.SEQUENCES_UPDATED,
      actions.SONG_EXTENDED,
      actions.SONG_SHORTENED,
      actions.TRACK_CREATED_AND_ADDED,
      actions.TRACK_IS_MUTED_TOGGLED,
      actions.TRACK_IS_SOLOING_TOGGLED,
      actions.TRACK_SYNTH_TYPE_SET,
      actions.TRACKS_ADDED,
      actions.TRACKS_DELETED,
      actions.TRACKS_SET,
      actions.TRACKS_UPDATED,
      sequenceData.actions.SELECTED_NOTES_SIZE_CHANGED,
      sequenceData.actions.SEQUENCE_CLOSED,
    ], saveToLocalStorage),
    takeEvery(shared.actions.INITIALIZED, initialize),
    takeEvery([
      actions.NOTES_DUPLICATED,
      actions.NOTES_DELETED,
      actions.SELECTED_NOTES_POSITION_NUDGED,
      actions.SELECTED_NOTES_SIZE_NUDGED,
      sequenceData.actions.NOTE_DRAWN,
      sequenceData.actions.NOTE_ERASED,
      sequenceData.actions.SELECTED_NOTES_MOVED_OCTAVE_DOWN,
      sequenceData.actions.SELECTED_NOTES_MOVED_OCTAVE_UP,
    ], pushUndo),
    takeEvery(actions.NOTES_ALL_SELECTED, selectAll),
    takeEvery(actions.NOTES_DUPLICATED, duplicateSelectedNotes),
    takeEvery(actions.NOTES_MOVE_STARTED, moveNotes),
    takeEvery(actions.REDO_POPPED, redo),
    takeEvery(actions.REDO_PUSHED, pushRedo),
    takeEvery(actions.SELECTED_NOTES_POSITION_NUDGED, nudgeSelectedNotesPosition),
    // takeEvery(actions.SELECTED_NOTES_SIZE_NUDGED, nudgeSelectedNotesSize),
    // takeEvery(shortcuts.actions.NUDGE_ALT_DOWN,
    //   () => nudgeSelectedNotesSize({ change: { x: 0, y: 1 } }),
    // ),
    // takeEvery(shortcuts.actions.NUDGE_ALT_LEFT,
    //   () => nudgeSelectedNotesSize({ change: { x: -1, y: 0 } }),
    // ),
    // takeEvery(shortcuts.actions.NUDGE_ALT_RIGHT,
    //   () => nudgeSelectedNotesSize({ change: { x: 1, y: 0 } }),
    // ),
    // takeEvery(shortcuts.actions.NUDGE_ALT_UP,
    //   () => nudgeSelectedNotesSize({ change: { x: 0, y: -1 } }),
    // ),
    takeEvery(actions.UNDO_POPPED, undo),
    takeEvery(actions.UNDO_PUSHED, pushUndo),
    takeEvery(sequenceData.actions.SELECTED_NOTES_DELETED, deleteSelectedNotes),
    takeEvery(sequenceData.actions.SELECTED_NOTES_MOVED, moveSelected),
    takeEvery(sequenceData.actions.SELECTED_NOTES_MOVED_OCTAVE_DOWN, shiftDownOctave),
    takeEvery(sequenceData.actions.SELECTED_NOTES_MOVED_OCTAVE_UP, shiftUpOctave),
    takeEvery(sequenceData.actions.SELECTED_NOTES_RESIZED, resizeSelected),
    takeEvery(shortcuts.actions.DELETE, deleteSelectedNotes),
    takeEvery(shortcuts.actions.DESELECT, deleteSelectedNotes),
    takeEvery(shortcuts.actions.DUPLICATE, duplicateSelectedNotes),
    takeEvery(shortcuts.actions.NUDGE_DOWN,
      () => nudgeSelectedNotesPosition({ change: { x: 0, y: 1 } }),
    ),
    takeEvery(shortcuts.actions.NUDGE_LEFT,
      () => nudgeSelectedNotesPosition({ change: { x: -1, y: 0 } }),
    ),
    takeEvery(shortcuts.actions.NUDGE_RIGHT,
      () => nudgeSelectedNotesPosition({ change: { x: 1, y: 0 } }),
    ),
    takeEvery(shortcuts.actions.NUDGE_UP,
        () => nudgeSelectedNotesPosition({ change: { x: 0, y: -1 } }),
      ),
    takeEvery(shortcuts.actions.REDO, redo),
    takeEvery(shortcuts.actions.SELECT_ALL, selectAll),
    takeEvery(shortcuts.actions.UNDO, undo),
  ];
}
