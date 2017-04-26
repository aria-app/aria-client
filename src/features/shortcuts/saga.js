import { includes } from 'lodash/fp';
import { eventChannel, takeEvery } from 'redux-saga';
import { fork, put, select, take } from 'redux-saga/effects';
import Mousetrap from 'mousetrap';
import shared from '../shared';
import * as actions from './actions';
import * as selectors from './selectors';

const shortcuts = [
  // { onPress: actions.SELECT_TOOL_S, combos: ['s'] },
  {
    onPress: actions.PAN_HELD,
    onRelease: actions.PAN_RELEASED,
    combos: ['space'],
  },
];

function* handleKeypress(keypress) {
  if (!keypress.isHeldAction) {
    yield put(keypress.action);
    return;
  }

  const heldKeys = yield select(selectors.getHeldKeys);
  const isHeldKey = includes(keypress.action.e.keyCode)(heldKeys);

  if (!isHeldKey) {
    yield put(actions.keyHoldStarted(keypress.action.e.keyCode));
    yield put(keypress.action);
    return;
  }

  if (!keypress.isRelease) return;

  yield put(actions.keyHoldStopped(keypress.action.e.keyCode));
  yield put(keypress.action);
}

function* initialize() {
  yield fork(registerShortcuts);
}

function* registerShortcuts() {
  const keypressChannel = keypressChannelFactory();

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const keypress = yield take(keypressChannel);
    yield fork(handleKeypress, keypress);
  }
}

export default function* saga() {
  yield [
    takeEvery(shared.actions.INITIALIZED, initialize),
  ];
}

function keypressChannelFactory() {
  return eventChannel((emit) => {
    shortcuts.forEach((shortcut) => {
      Mousetrap.bind(shortcut.combos, (e) => {
        e.preventDefault();
        emit({
          action: {
            type: shortcut.onPress,
            e,
          },
          isHeldAction: !!shortcut.onRelease,
        });
      });

      if (shortcut.onRelease) {
        Mousetrap.bind(shortcut.combos, (e) => {
          e.preventDefault();
          emit({
            action: {
              type: shortcut.onRelease,
              e,
            },
            isHeldAction: !!shortcut.onRelease,
            isRelease: true,
          });
        }, 'keyup');
      }
    });
  });
}
