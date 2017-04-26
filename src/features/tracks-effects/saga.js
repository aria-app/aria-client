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

function* nudgeSelectedSequenceLeft() {
  const activeSequenceId = yield select(song.selectors.getActiveSequenceId);

  if (activeSequenceId) return;

  const selectedSequenceId = yield select(selectors.getSelectedSequenceId);

  if (!selectedSequenceId) return;

  yield put(tracksData.actions.sequenceNudgedLeft(selectedSequenceId));
}

function* nudgeSelectedSequenceRight() {
  const activeSequenceId = yield select(song.selectors.getActiveSequenceId);

  if (activeSequenceId) return;

  const selectedSequenceId = yield select(selectors.getSelectedSequenceId);

  if (!selectedSequenceId) return;

  yield put(tracksData.actions.sequenceNudgedRight(selectedSequenceId));
}

function* shortenSelectedSequence() {
  const selectedSequenceId = yield select(selectors.getSelectedSequenceId);

  if (!selectedSequenceId) return;

  yield put(tracksData.actions.sequenceShortened(selectedSequenceId));
}

export default function* saga() {
  yield [
    takeEvery(contextMenu.actions.CONTEXT_MENU_ITEM_SELECTED, contextMenuItemSelected),
    takeEvery(shortcuts.actions.DELETE, deleteSelectedSequence),
    takeEvery(shortcuts.actions.NUDGE_ALT_LEFT, shortenSelectedSequence),
    takeEvery(shortcuts.actions.NUDGE_ALT_RIGHT, extendSelectedSequence),
    takeEvery(shortcuts.actions.NUDGE_LEFT, nudgeSelectedSequenceLeft),
    takeEvery(shortcuts.actions.NUDGE_RIGHT, nudgeSelectedSequenceRight),
  ];
}
