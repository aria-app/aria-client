import { isEmpty, isEqual, last } from 'lodash/fp';
import { takeEvery } from 'redux-saga';
import { put, select } from 'redux-saga/effects';
import contextMenu from '../context-menu';
import shortcuts from '../shortcuts';
import song from '../song';
import tracksData from '../tracks-data';
import * as constants from './constants';
import * as selectors from './selectors';

function* addNewTrack() {
  yield put(song.actions.trackCreatedAndAdded());
}

function* addSequenceToTrack({ id, position }) {
  yield put(song.actions.sequenceAddedToTrack(id, position));
}

function* contextMenuItemSelected({ item }) {
  const { DELETE_SEQUENCE } = constants.contextMenuActions;

  switch (item.action) {
    case DELETE_SEQUENCE:
      return yield put(tracksData.actions.sequenceDeleted([item.id]));
    default:
      return undefined;
  }
}

function* deleteSelectedSequence() {
  const activeSequenceId = yield select(song.selectors.getActiveSequenceId);

  if (activeSequenceId) return;

  const selectedSequenceId = yield select(selectors.getSelectedSequenceId);

  if (!selectedSequenceId) return;

  yield put(song.actions.sequencesDeleted([selectedSequenceId]));
}

function* extendSelectedSequence() {
  const activeSequenceId = yield select(song.selectors.getActiveSequenceId);

  if (activeSequenceId) return;

  const selectedSequenceId = yield select(selectors.getSelectedSequenceId);

  if (!selectedSequenceId) return;

  yield put(song.actions.sequenceExtended(selectedSequenceId));
}

function* extendSong() {
  yield put(song.actions.songExtended());
}

function* nudgeSelectedSequenceLeft() {
  const activeSequenceId = yield select(song.selectors.getActiveSequenceId);

  if (activeSequenceId) return;

  const selectedSequenceId = yield select(selectors.getSelectedSequenceId);

  if (!selectedSequenceId) return;

  yield put(song.actions.sequenceNudgedLeft(selectedSequenceId));
}

function* nudgeSelectedSequenceRight() {
  const activeSequenceId = yield select(song.selectors.getActiveSequenceId);

  if (activeSequenceId) return;

  const selectedSequenceId = yield select(selectors.getSelectedSequenceId);

  if (!selectedSequenceId) return;

  yield put(song.actions.sequenceNudgedRight(selectedSequenceId));
}

function* openSelectedSequence() {
  const selectedSequenceId = yield select(selectors.getSelectedSequenceId);

  if (!selectedSequenceId) return;

  yield put(song.actions.sequenceOpened(selectedSequenceId));
}

function* pushRedo() {
  const sequences = yield select(song.selectors.getSequences);
  const tracks = yield select(song.selectors.getTracks);
  const redos = yield select(selectors.getRedos);
  yield put(tracksData.actions.redosSet([
    ...redos,
    { sequences, tracks },
  ]));
}

function* pushUndo() {
  const activeSequenceId = yield select(song.selectors.getActiveSequenceId);

  if (activeSequenceId) return;

  const sequences = yield select(song.selectors.getSequences);
  const tracks = yield select(song.selectors.getTracks);
  const undos = yield select(selectors.getUndos);

  if (
    (last(undos)) &&
    (isEqual(last(undos).sequences, sequences)) &&
    (isEqual(last(undos).tracks, tracks))
  ) return;

  yield put(tracksData.actions.undosSet([
    ...undos,
    { sequences, tracks },
  ]));
  yield put(tracksData.actions.redosSet([]));
}

function* redo() {
  if (yield select(song.selectors.getActiveSequence)) return;

  const redos = yield select(selectors.getRedos);

  if (isEmpty(redos)) return;

  const sequences = yield select(song.selectors.getSequences);
  const tracks = yield select(song.selectors.getTracks);
  const undos = yield select(selectors.getUndos);

  yield put(tracksData.actions.undosSet([
    ...undos,
    { sequences, tracks },
  ]));
  yield put(song.actions.sequencesSet(last(redos).sequences));
  yield put(song.actions.tracksSet(last(redos).tracks));
  yield put(tracksData.actions.redosSet(redos.slice(0, redos.length - 1)));
}

function* shortenSelectedSequence() {
  const selectedSequenceId = yield select(selectors.getSelectedSequenceId);

  if (!selectedSequenceId) return;

  yield put(song.actions.sequenceShortened(selectedSequenceId));
}

function* shortenSong() {
  yield put(song.actions.songShortened());
}

function* toggleTrackIsMuted({ id }) {
  yield put(song.actions.trackIsMutedToggled(id));
}

function* toggleTrackIsSoloing({ id }) {
  yield put(song.actions.trackIsSoloingToggled(id));
}

function* undo() {
  if (yield select(song.selectors.getActiveSequence)) return;

  const undos = yield select(selectors.getUndos);

  if (isEmpty(undos)) return;

  yield put(tracksData.actions.redoPushed());
  yield put(song.actions.sequencesSet(last(undos).sequences));
  yield put(song.actions.tracksSet(last(undos).tracks));
  yield put(tracksData.actions.undosSet(undos.slice(0, undos.length - 1)));
}

export default function* saga() {
  yield [
    takeEvery(tracksData.actions.SELECTED_SEQUENCE_DELETED, pushUndo),
    takeEvery(tracksData.actions.SELECTED_SEQUENCE_EXTENDED, pushUndo),
    takeEvery(tracksData.actions.SELECTED_SEQUENCE_NUDGED_LEFT, pushUndo),
    takeEvery(tracksData.actions.SELECTED_SEQUENCE_NUDGED_RIGHT, pushUndo),
    takeEvery(tracksData.actions.SELECTED_SEQUENCE_SHORTENED, pushUndo),
    takeEvery(tracksData.actions.SEQUENCE_ADDED_TO_TRACK, pushUndo),
    takeEvery(tracksData.actions.SONG_EXTENDED, pushUndo),
    takeEvery(tracksData.actions.SONG_SHORTENED, pushUndo),
    takeEvery(tracksData.actions.TRACK_CREATED_AND_ADDED, pushUndo),
    takeEvery(tracksData.actions.TRACK_IS_MUTED_TOGGLED, pushUndo),
    takeEvery(tracksData.actions.TRACK_IS_SOLOING_TOGGLED, pushUndo),
    takeEvery(tracksData.actions.UNDO_PUSHED, pushUndo),
    takeEvery(tracksData.actions.TRACK_CREATED_AND_ADDED, addNewTrack),
    takeEvery(tracksData.actions.REDO_POPPED, redo),
    takeEvery(tracksData.actions.REDO_PUSHED, pushRedo),
    takeEvery(tracksData.actions.SELECTED_SEQUENCE_DELETED, deleteSelectedSequence),
    takeEvery(tracksData.actions.SELECTED_SEQUENCE_EXTENDED, extendSelectedSequence),
    takeEvery(tracksData.actions.SELECTED_SEQUENCE_NUDGED_LEFT, nudgeSelectedSequenceLeft),
    takeEvery(tracksData.actions.SELECTED_SEQUENCE_NUDGED_RIGHT, nudgeSelectedSequenceRight),
    takeEvery(tracksData.actions.SELECTED_SEQUENCE_OPENED, openSelectedSequence),
    takeEvery(tracksData.actions.SELECTED_SEQUENCE_SHORTENED, shortenSelectedSequence),
    takeEvery(tracksData.actions.SEQUENCE_ADDED_TO_TRACK, addSequenceToTrack),
    takeEvery(tracksData.actions.SONG_EXTENDED, extendSong),
    takeEvery(tracksData.actions.SONG_SHORTENED, shortenSong),
    takeEvery(tracksData.actions.TRACK_IS_MUTED_TOGGLED, toggleTrackIsMuted),
    takeEvery(tracksData.actions.TRACK_IS_SOLOING_TOGGLED, toggleTrackIsSoloing),
    takeEvery(tracksData.actions.UNDO_POPPED, undo),
    takeEvery(contextMenu.actions.CONTEXT_MENU_ITEM_SELECTED, contextMenuItemSelected),
    takeEvery(shortcuts.actions.DELETE, pushUndo),
    takeEvery(shortcuts.actions.DELETE, deleteSelectedSequence),
    takeEvery(shortcuts.actions.NUDGE_ALT_LEFT, shortenSelectedSequence),
    takeEvery(shortcuts.actions.NUDGE_ALT_RIGHT, extendSelectedSequence),
    takeEvery(shortcuts.actions.NUDGE_LEFT, nudgeSelectedSequenceLeft),
    takeEvery(shortcuts.actions.NUDGE_RIGHT, nudgeSelectedSequenceRight),
    takeEvery(shortcuts.actions.REDO, redo),
    takeEvery(shortcuts.actions.UNDO, undo),
  ];
}
