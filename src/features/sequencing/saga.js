import _ from 'lodash';
import { takeEvery } from 'redux-saga';
import { put, select } from 'redux-saga/effects';
import notes from '../notes';
import shared from '../shared';
import shortcuts from '../shortcuts';
import * as actions from './actions';
import * as selectors from './selectors';

const { toolTypes } = shared.constants;

function* handleToolTypeSelected({ toolType }) {
  const previousToolType = yield select(selectors.getToolType);

  if (_.includes([toolTypes.DRAW, toolTypes.ERASE], toolType)) {
    yield put(notes.actions.allNotesDeselected());
  }

  yield put(actions.toolTypeSet(toolType, previousToolType));
}

function* setMousePointIfChanged({ point }) {
  const prevMousePoint = yield select(selectors.getMousePoint);

  if (point === prevMousePoint) return;

  yield put(actions.mousePointSet(point));
}

function* setScrollLeftIfChanged({ scrollLeft }) {
  const prevScrollLeft = yield select(selectors.getScrollLeft);

  if (scrollLeft === prevScrollLeft) return;

  yield put(actions.scrollLeftSet(scrollLeft));
}

function* setScrollTopIfChanged({ scrollTop }) {
  const prevScrollTop = yield select(selectors.getScrollTop);

  if (scrollTop === prevScrollTop) return;

  yield put(actions.scrollTopSet(scrollTop));
}

function* startPanning() {
  const currentToolType = yield select(selectors.getToolType);

  if (currentToolType === toolTypes.PAN) return;

  yield put(actions.toolSelected(toolTypes.PAN));
}

function* stopPanning() {
  const previousToolType = yield select(selectors.getPreviousToolType);

  if (
    !previousToolType ||
    previousToolType === toolTypes.PAN
  ) return;

  yield put(actions.toolSelected(previousToolType));
}

export default function* saga() {
  yield [
    takeEvery(actions.MOUSE_MOVED, setMousePointIfChanged),
    takeEvery(actions.SCROLLED_HORIZONTALLY, setScrollLeftIfChanged),
    takeEvery(actions.SCROLLED_VERTICALLY, setScrollTopIfChanged),
    takeEvery(actions.TOOL_SELECTED, handleToolTypeSelected),
    takeEvery(shortcuts.actions.SPACE_HELD, startPanning),
    takeEvery(shortcuts.actions.SPACE_RELEASED, stopPanning),
    takeEvery(shortcuts.actions.SELECT_TOOL_D,
      () => handleToolTypeSelected({ toolType: toolTypes.DRAW })
    ),
    takeEvery(shortcuts.actions.SELECT_TOOL_E,
      () => handleToolTypeSelected({ toolType: toolTypes.ERASE })
    ),
    takeEvery(shortcuts.actions.SELECT_TOOL_M,
      () => handleToolTypeSelected({ toolType: toolTypes.MOVE })
    ),
    takeEvery(shortcuts.actions.SELECT_TOOL_P,
      () => handleToolTypeSelected({ toolType: toolTypes.PAN })
    ),
    takeEvery(shortcuts.actions.SELECT_TOOL_S,
      () => handleToolTypeSelected({ toolType: toolTypes.SELECT })
    ),
  ];
}
