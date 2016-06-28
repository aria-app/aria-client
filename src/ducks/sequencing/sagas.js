import _ from 'lodash';
import { takeEvery } from 'redux-saga';
import { put, select } from 'redux-saga/effects';
import notes from 'ducks/notes';
import shared from 'ducks/shared';
import * as actions from './actions';
import * as actionTypes from './action-types';
import * as selectors from './selectors';

const { toolTypes } = shared.constants;

function* handleToolTypeSelected({ toolType }) {
  const previousToolType = yield select(selectors.getToolType);
  if (_.includes([toolTypes.DRAW, toolTypes.ERASE], toolType)) {
    yield put(notes.actions.allNotesDeselected());
  }
  yield put(actions.setToolType(toolType, previousToolType));
}

function* setMousePointIfChanged({ point }) {
  const prevMousePoint = yield select(selectors.getMousePoint);

  if (point === prevMousePoint) return;

  yield put(actions.setMousePoint(point));
}

function* setScrollLeftIfChanged({ scrollLeft }) {
  const prevScrollLeft = yield select(selectors.getScrollLeft);

  if (scrollLeft === prevScrollLeft) return;

  yield put(actions.setScrollLeft(scrollLeft));
}

function* setScrollTopIfChanged({ scrollTop }) {
  const prevScrollTop = yield select(selectors.getScrollTop);

  if (scrollTop === prevScrollTop) return;

  yield put(actions.setScrollTop(scrollTop));
}

export default function* saga() {
  yield [
    takeEvery(actionTypes.MOUSE_MOVED, setMousePointIfChanged),
    takeEvery(actionTypes.SCROLLED_HORIZONTALLY, setScrollLeftIfChanged),
    takeEvery(actionTypes.SCROLLED_VERTICALLY, setScrollTopIfChanged),
    takeEvery(actionTypes.SELECT_TOOL, handleToolTypeSelected),
  ];
}
