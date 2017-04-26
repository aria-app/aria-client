import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import contextMenu from '../context-menu';
import tracksData from '../tracks-data';
import * as constants from './constants';

function* contextMenuItemSelected({ item }) {
  const { DELETE_SEQUENCE } = constants.contextMenuActions;

  if (item.action === DELETE_SEQUENCE) {
    yield put(tracksData.actions.sequenceDeleted(item.id));
  }
}

export default function* saga() {
  yield [
    takeEvery(contextMenu.actions.CONTEXT_MENU_ITEM_SELECTED, contextMenuItemSelected),
  ];
}
