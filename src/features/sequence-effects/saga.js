import { takeEvery } from 'redux-saga';
import { put, select } from 'redux-saga/effects';
import shared from '../shared';
import shortcuts from '../shortcuts';
import sequenceData from '../sequence-data';
import * as selectors from './selectors';

const { toolTypes } = shared.constants;

function* startPanning() {
  const toolType = yield select(selectors.getToolType);

  yield put(sequenceData.actions.toolSelected({
    toolType: toolTypes.PAN,
    previousToolType: toolType,
  }));
}

function* stopPanning() {
  const toolType = yield select(selectors.getToolType);
  const previousToolType = yield select(selectors.getPreviousToolType);

  yield put(sequenceData.actions.toolSelected({
    toolType: previousToolType,
    previousToolType: toolType,
  }));
}

export default function* saga() {
  yield [
    takeEvery(shortcuts.actions.PAN_HELD, startPanning),
    takeEvery(shortcuts.actions.PAN_RELEASED, stopPanning),
  ];
}
