import { isEmpty, throttle } from 'lodash/fp';
import { takeEvery } from 'redux-saga';
import { put, select } from 'redux-saga/effects';
import appData from '../../app-data';
import sequenceData from '../../sequence-data';
import shared from '../../shared';
import shortcuts from '../../shortcuts';
import tracksData from '../../tracks-data';
import * as actions from '../actions';
import * as helpers from '../helpers';
import * as selectors from '../selectors';

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

function* nudgeSelectedNotesPosition({ change }) {
  const selectedNotes = yield select(selectors.getSelectedNotes);

  if (isEmpty(selectedNotes)) return;

  yield put(actions.notesMoveStarted(selectedNotes, change));
}

// function* nudgeSelectedNotesSize({ change }) {
//   yield put(actions.selectedNotesSizeChanged(change));
// }

function* selectAll() {
  const notes = yield select(selectors.getActiveSequenceNotes);

  if (isEmpty(notes)) return;

  yield put(actions.notesSelected(notes));
}

export default function* saga() {
  yield [
    takeEvery(actions.NOTES_ALL_SELECTED, selectAll),
    takeEvery(actions.NOTES_DUPLICATED, duplicateSelectedNotes),
    takeEvery(actions.SELECTED_NOTES_POSITION_NUDGED, nudgeSelectedNotesPosition),
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
    takeEvery(shortcuts.actions.SELECT_ALL, selectAll),
    // Save to local storage
    takeEvery(actions.NOTES_ADDED, saveToLocalStorage),
    takeEvery(actions.NOTES_DELETED, saveToLocalStorage),
    takeEvery(actions.NOTES_DUPLICATED, saveToLocalStorage),
    takeEvery(actions.NOTES_MOVE_SUCCEEDED, saveToLocalStorage),
    takeEvery(actions.NOTES_SET, saveToLocalStorage),
    takeEvery(appData.actions.BPM_SET, saveToLocalStorage),
    takeEvery(sequenceData.actions.NOTE_DRAWN, saveToLocalStorage),
    takeEvery(sequenceData.actions.NOTE_ERASED, saveToLocalStorage),
    takeEvery(sequenceData.actions.NOTES_DRAGGED, saveToLocalStorage),
    takeEvery(sequenceData.actions.NOTES_DUPLICATED, saveToLocalStorage),
    takeEvery(sequenceData.actions.NOTES_MOVED_OCTAVE_DOWN, saveToLocalStorage),
    takeEvery(sequenceData.actions.NOTES_MOVED_OCTAVE_UP, saveToLocalStorage),
    takeEvery(sequenceData.actions.NOTES_RESIZED, saveToLocalStorage),
    takeEvery(sequenceData.actions.SEQUENCE_CLOSED, saveToLocalStorage),
    takeEvery(tracksData.actions.SEQUENCE_NUDGED_LEFT, saveToLocalStorage),
    takeEvery(tracksData.actions.SEQUENCE_NUDGED_RIGHT, saveToLocalStorage),
    takeEvery(tracksData.actions.SONG_EXTENDED, saveToLocalStorage),
    takeEvery(tracksData.actions.SONG_SHORTENED, saveToLocalStorage),
    takeEvery(tracksData.actions.TRACK_ADDED, saveToLocalStorage),
    takeEvery(tracksData.actions.TRACK_IS_MUTED_TOGGLED, saveToLocalStorage),
    takeEvery(tracksData.actions.TRACK_IS_SOLOING_TOGGLED, saveToLocalStorage),
    takeEvery(tracksData.actions.TRACK_SYNTH_TYPE_SET, saveToLocalStorage),
  ];
}
