import { isEmpty, map, throttle } from 'lodash/fp';
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
    takeEvery(actions.SEQUENCE_ADDED_TO_TRACK, addSequenceToTrack),
    takeEvery(actions.TRACKS_DELETED, deleteSequencesFromTracks),
    takeEvery([
      actions.ID_SET,
      actions.MEASURE_COUNT_SET,
      actions.NAME_SET,
      actions.NOTES_ADDED,
      actions.NOTES_DELETED,
      actions.NOTES_DUPLICATED,
      actions.NOTES_MOVE_SUCCEEDED,
      actions.NOTES_SET,
      actions.SEQUENCE_ADDED_TO_TRACK,
      actions.SEQUENCE_NUDGED_LEFT,
      actions.SEQUENCE_NUDGED_RIGHT,
      actions.SEQUENCES_ADDED,
      actions.SEQUENCES_DELETED,
      actions.SEQUENCES_SET,
      actions.SEQUENCES_UPDATED,
      actions.SONG_EXTENDED,
      actions.SONG_SHORTENED,
      actions.TRACK_IS_MUTED_TOGGLED,
      actions.TRACK_IS_SOLOING_TOGGLED,
      actions.TRACK_SYNTH_TYPE_SET,
      actions.TRACKS_ADDED,
      actions.TRACKS_DELETED,
      actions.TRACKS_SET,
      actions.TRACKS_UPDATED,
      appData.actions.BPM_SET,
      sequenceData.actions.NOTE_DRAWN,
      sequenceData.actions.NOTE_ERASED,
      sequenceData.actions.NOTES_DRAGGED,
      sequenceData.actions.NOTES_DUPLICATED,
      sequenceData.actions.NOTES_MOVED_OCTAVE_DOWN,
      sequenceData.actions.NOTES_MOVED_OCTAVE_UP,
      sequenceData.actions.NOTES_RESIZED,
      sequenceData.actions.SEQUENCE_CLOSED,
      tracksData.actions.TRACK_CREATED_AND_ADDED,
    ], saveToLocalStorage),
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
  ];
}
