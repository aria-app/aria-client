import _ from 'lodash';
import { takeEvery } from 'redux-saga';
import { put, select } from 'redux-saga/effects';
import contextMenu from 'ducks/context-menu';
import shortcuts from 'ducks/shortcuts';
import song from 'ducks/song';
import * as actions from './actions';
import * as actionTypes from './action-types';
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
      return yield put(actions.sequenceDeleted([item.id]));
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
  yield put(actions.redosSet([
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
    (_.last(undos)) &&
    (_.isEqual(_.last(undos).sequences, sequences)) &&
    (_.isEqual(_.last(undos).tracks, tracks))
  ) return;

  yield put(actions.undosSet([
    ...undos,
    { sequences, tracks },
  ]));
  yield put(actions.redosSet([]));
}

function* redo() {
  if (yield select(song.selectors.getActiveSequence)) return;

  const redos = yield select(selectors.getRedos);

  if (_.isEmpty(redos)) return;

  const sequences = yield select(song.selectors.getSequences);
  const tracks = yield select(song.selectors.getTracks);
  const undos = yield select(selectors.getUndos);

  yield put(actions.undosSet([
    ...undos,
    { sequences, tracks },
  ]));
  yield put(song.actions.sequencesSet(_.last(redos).sequences));
  yield put(song.actions.tracksSet(_.last(redos).tracks));
  yield put(actions.redosSet(redos.slice(0, redos.length - 1)));
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

  if (_.isEmpty(undos)) return;

  yield put(actions.redoPushed());
  yield put(song.actions.sequencesSet(_.last(undos).sequences));
  yield put(song.actions.tracksSet(_.last(undos).tracks));
  yield put(actions.undosSet(undos.slice(0, undos.length - 1)));
}

export default function* saga() {
  yield [
    takeEvery(actionTypes.SELECTED_SEQUENCE_DELETED, pushUndo),
    takeEvery(actionTypes.SELECTED_SEQUENCE_EXTENDED, pushUndo),
    takeEvery(actionTypes.SELECTED_SEQUENCE_NUDGED_LEFT, pushUndo),
    takeEvery(actionTypes.SELECTED_SEQUENCE_NUDGED_RIGHT, pushUndo),
    takeEvery(actionTypes.SELECTED_SEQUENCE_SHORTENED, pushUndo),
    takeEvery(actionTypes.SEQUENCE_ADDED_TO_TRACK, pushUndo),
    takeEvery(actionTypes.SONG_EXTENDED, pushUndo),
    takeEvery(actionTypes.SONG_SHORTENED, pushUndo),
    takeEvery(actionTypes.TRACK_CREATED_AND_ADDED, pushUndo),
    takeEvery(actionTypes.TRACK_IS_MUTED_TOGGLED, pushUndo),
    takeEvery(actionTypes.TRACK_IS_SOLOING_TOGGLED, pushUndo),
    takeEvery(actionTypes.UNDO_PUSHED, pushUndo),
    takeEvery(actionTypes.TRACK_CREATED_AND_ADDED, addNewTrack),
    takeEvery(actionTypes.REDO_POPPED, redo),
    takeEvery(actionTypes.REDO_PUSHED, pushRedo),
    takeEvery(actionTypes.SELECTED_SEQUENCE_DELETED, deleteSelectedSequence),
    takeEvery(actionTypes.SELECTED_SEQUENCE_EXTENDED, extendSelectedSequence),
    takeEvery(actionTypes.SELECTED_SEQUENCE_NUDGED_LEFT, nudgeSelectedSequenceLeft),
    takeEvery(actionTypes.SELECTED_SEQUENCE_NUDGED_RIGHT, nudgeSelectedSequenceRight),
    takeEvery(actionTypes.SELECTED_SEQUENCE_OPENED, openSelectedSequence),
    takeEvery(actionTypes.SELECTED_SEQUENCE_SHORTENED, shortenSelectedSequence),
    takeEvery(actionTypes.SEQUENCE_ADDED_TO_TRACK, addSequenceToTrack),
    takeEvery(actionTypes.SONG_EXTENDED, extendSong),
    takeEvery(actionTypes.SONG_SHORTENED, shortenSong),
    takeEvery(actionTypes.TRACK_IS_MUTED_TOGGLED, toggleTrackIsMuted),
    takeEvery(actionTypes.TRACK_IS_SOLOING_TOGGLED, toggleTrackIsSoloing),
    takeEvery(actionTypes.UNDO_POPPED, undo),
    takeEvery(contextMenu.actionTypes.CONTEXT_MENU_ITEM_SELECTED, contextMenuItemSelected),
    takeEvery(shortcuts.actionTypes.DELETE, pushUndo),
    takeEvery(shortcuts.actionTypes.DELETE, deleteSelectedSequence),
    takeEvery(shortcuts.actionTypes.NUDGE_ALT_LEFT, shortenSelectedSequence),
    takeEvery(shortcuts.actionTypes.NUDGE_ALT_RIGHT, extendSelectedSequence),
    takeEvery(shortcuts.actionTypes.NUDGE_LEFT, nudgeSelectedSequenceLeft),
    takeEvery(shortcuts.actionTypes.NUDGE_RIGHT, nudgeSelectedSequenceRight),
    takeEvery(shortcuts.actionTypes.REDO, redo),
    takeEvery(shortcuts.actionTypes.UNDO, undo),
  ];
}
