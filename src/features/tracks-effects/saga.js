import { takeEvery } from 'redux-saga';
import { put, select } from 'redux-saga/effects';
import contextMenu from '../context-menu';
import shortcuts from '../shortcuts';
import song from '../song';
import tracksData from '../tracks-data';
import * as constants from './constants';
import * as selectors from './selectors';

function* contextMenuItemSelected({ item }) {
  const { DELETE_SEQUENCE } = constants.contextMenuActions;

  if (item.action === DELETE_SEQUENCE) {
    yield put(tracksData.actions.sequenceDeleted(item.id));
  }
}

function* deleteSelectedSequence() {
  const activeSequenceId = yield select(song.selectors.getActiveSequenceId);

  if (activeSequenceId) return;

  const selectedSequenceId = yield select(selectors.getSelectedSequenceId);

  if (!selectedSequenceId) return;

  yield put(tracksData.actions.sequenceDeleted(selectedSequenceId));
}

function* extendSelectedSequence() {
  const activeSequenceId = yield select(song.selectors.getActiveSequenceId);

  if (activeSequenceId) return;

  const selectedSequenceId = yield select(selectors.getSelectedSequenceId);

  if (!selectedSequenceId) return;

  yield put(tracksData.actions.sequenceExtended(selectedSequenceId));
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

function* shortenSelectedSequence() {
  const selectedSequenceId = yield select(selectors.getSelectedSequenceId);

  if (!selectedSequenceId) return;

  yield put(tracksData.actions.sequenceShortened(selectedSequenceId));
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

export default function* saga() {
  yield [
    takeEvery(tracksData.actions.SELECTED_SEQUENCE_NUDGED_LEFT, nudgeSelectedSequenceLeft),
    takeEvery(tracksData.actions.SELECTED_SEQUENCE_NUDGED_RIGHT, nudgeSelectedSequenceRight),
    takeEvery(tracksData.actions.SELECTED_SEQUENCE_OPENED, openSelectedSequence),
    takeEvery(tracksData.actions.SONG_EXTENDED, extendSong),
    takeEvery(tracksData.actions.SONG_SHORTENED, shortenSong),
    takeEvery(tracksData.actions.TRACK_IS_MUTED_TOGGLED, toggleTrackIsMuted),
    takeEvery(tracksData.actions.TRACK_IS_SOLOING_TOGGLED, toggleTrackIsSoloing),
    takeEvery(contextMenu.actions.CONTEXT_MENU_ITEM_SELECTED, contextMenuItemSelected),
    takeEvery(shortcuts.actions.DELETE, deleteSelectedSequence),
    takeEvery(shortcuts.actions.NUDGE_ALT_LEFT, shortenSelectedSequence),
    takeEvery(shortcuts.actions.NUDGE_ALT_RIGHT, extendSelectedSequence),
    takeEvery(shortcuts.actions.NUDGE_LEFT, nudgeSelectedSequenceLeft),
    takeEvery(shortcuts.actions.NUDGE_RIGHT, nudgeSelectedSequenceRight),
  ];
}
