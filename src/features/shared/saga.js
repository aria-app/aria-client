import _ from 'lodash';
import { eventChannel, takeEvery } from 'redux-saga';
import { put, select, take } from 'redux-saga/effects';
import * as actions from './actions';
import * as selectors from './selectors';

function* watchWindowSize() {
  const windowResizeChannel = windowResizeChannelFactory();

  // eslint-disable-next-line no-constant-condition
  while (true) {
    yield take(windowResizeChannel);
    const previousHeight = yield select(selectors.getWindowHeight);
    const previousWidth = yield select(selectors.getWindowWidth);

    if (window.innerHeight !== previousHeight) {
      yield put(actions.windowHeightChanged(window.innerHeight));
    }

    if (window.innerWidth !== previousWidth) {
      yield put(actions.windowWidthChanged(window.innerWidth));
    }
  }
}

export default function* saga() {
  yield [
    takeEvery(actions.INITIALIZED, watchWindowSize),
  ];
}

function windowResizeChannelFactory() {
  return eventChannel((emit) => {
    window.addEventListener('resize', _.debounce(emit, 16));
  });
}
