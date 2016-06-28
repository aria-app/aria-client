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
  yield put(song.actions.addNewTrack());
}

function* addSequenceToTrack({ track, position }) {
  yield put(song.actions.addSequenceToTrack(track, position));
}

function* contextMenuItemSelected({ item }) {
  const { DELETE_SEQUENCE } = constants.contextMenuActions;

  switch (item.action) {
    case DELETE_SEQUENCE:
      return yield put(song.actions.deleteSequence(item.sequence));
    default:
      return undefined;
  }
}

function* deleteSequence({ sequence }) {
  yield put(song.actions.deleteSequence(sequence));
}

function* extendSequence({ sequence }) {
  yield put(song.actions.extendSequence(sequence));
}

function* moveSequenceLeft({ sequence }) {
  yield put(song.actions.moveSequenceLeft(sequence));
}

function* moveSequenceRight({ sequence }) {
  yield put(song.actions.moveSequenceRight(sequence));
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
  yield put(song.actions.setSequences(_.last(redos).sequences));
  yield put(song.actions.setTracks(_.last(redos).tracks));
  yield put(actions.redosSet(redos.slice(0, redos.length - 1)));
}

function* shortenSequence({ sequence }) {
  yield put(song.actions.shortenSequence(sequence));
}

function* toggleTrackIsMuted({ id }) {
  yield put(song.actions.toggleTrackIsMuted(id));
}

function* toggleTrackIsSoloing({ id }) {
  yield put(song.actions.toggleTrackIsSoloing(id));
}

function* undo() {
  if (yield select(song.selectors.getActiveSequence)) return;

  const undos = yield select(selectors.getUndos);

  if (_.isEmpty(undos)) return;

  yield put(actions.redoPushed());
  yield put(song.actions.setSequences(_.last(undos).sequences));
  yield put(song.actions.setTracks(_.last(undos).tracks));
  yield put(actions.undosSet(undos.slice(0, undos.length - 1)));
}

export default function* saga() {
  yield [
    takeEvery([
      actionTypes.NEW_TRACK_ADDED,
      actionTypes.SEQUENCE_ADDED_TO_TRACK,
      actionTypes.SEQUENCE_DELETED,
      actionTypes.SEQUENCE_EXTENDED,
      actionTypes.SEQUENCE_NUDGED_LEFT,
      actionTypes.SEQUENCE_NUDGED_RIGHT,
      actionTypes.SEQUENCE_SHORTENED,
      actionTypes.TRACK_IS_MUTED_TOGGLED,
      actionTypes.TRACK_IS_SOLOING_TOGGLED,
      actionTypes.UNDO_PUSHED,
    ], pushUndo),
    takeEvery(actionTypes.NEW_TRACK_ADDED, addNewTrack),
    takeEvery(actionTypes.REDO_POPPED, redo),
    takeEvery(actionTypes.REDO_PUSHED, pushRedo),
    takeEvery(actionTypes.SEQUENCE_ADDED_TO_TRACK, addSequenceToTrack),
    takeEvery(actionTypes.SEQUENCE_DELETED, deleteSequence),
    takeEvery(actionTypes.SEQUENCE_EXTENDED, extendSequence),
    takeEvery(actionTypes.SEQUENCE_NUDGED_LEFT, moveSequenceLeft),
    takeEvery(actionTypes.SEQUENCE_NUDGED_RIGHT, moveSequenceRight),
    takeEvery(actionTypes.SEQUENCE_SHORTENED, shortenSequence),
    takeEvery(actionTypes.TRACK_IS_MUTED_TOGGLED, toggleTrackIsMuted),
    takeEvery(actionTypes.TRACK_IS_SOLOING_TOGGLED, toggleTrackIsSoloing),
    takeEvery(actionTypes.UNDO_POPPED, undo),
    takeEvery(contextMenu.actionTypes.CONTEXT_MENU_ITEM_SELECTED, contextMenuItemSelected),
    takeEvery(shortcuts.actionTypes.REDO, redo),
    takeEvery(shortcuts.actionTypes.UNDO, undo),
  ];
}
