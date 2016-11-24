import { takeEvery } from 'redux-saga';
import { put, select } from 'redux-saga/effects';
import * as actions from './actions';
import * as selectors from './selectors';

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

export default function* saga() {
  yield [
    takeEvery(actions.MOUSE_MOVED, setMousePointIfChanged),
    takeEvery(actions.SCROLLED_HORIZONTALLY, setScrollLeftIfChanged),
    takeEvery(actions.SCROLLED_VERTICALLY, setScrollTopIfChanged),
  ];
}
