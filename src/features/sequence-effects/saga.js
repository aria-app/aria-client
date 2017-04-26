import { takeEvery } from 'redux-saga';
import { put, select } from 'redux-saga/effects';
import shared from '../shared';
import shortcuts from '../shortcuts';
import sequenceData from '../sequence-data';
import * as selectors from './selectors';

const { toolTypes } = shared.constants;

function* selectTool({ payload }) {
  const previousToolType = yield select(selectors.getToolType);

  yield put(sequenceData.actions.toolTypeSet({
    toolType: payload.toolType,
    previousToolType,
  }));
}

function* startPanning() {
  const currentToolType = yield select(selectors.getToolType);

  if (currentToolType === toolTypes.PAN) return;

  yield put(sequenceData.actions.toolSelected({
    toolType: toolTypes.PAN,
  }));
}

function* stopPanning() {
  const previousToolType = yield select(selectors.getPreviousToolType);

  if (
    !previousToolType ||
    previousToolType === toolTypes.PAN
  ) return;

  yield put(sequenceData.actions.toolSelected({
    toolType: previousToolType,
  }));
}

export default function* saga() {
  yield [
    takeEvery(sequenceData.actions.TOOL_SELECTED, selectTool),
    takeEvery(shortcuts.actions.PAN_HELD, startPanning),
    takeEvery(shortcuts.actions.PAN_RELEASED, stopPanning),
  ];
}
