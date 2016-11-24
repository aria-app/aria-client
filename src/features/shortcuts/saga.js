import _ from 'lodash';
import { eventChannel, takeEvery } from 'redux-saga';
import { fork, put, select, take } from 'redux-saga/effects';
import Mousetrap from 'mousetrap';
import shared from '../shared';
import * as actions from './actions';
import * as selectors from './selectors';

const shortcuts = [
  { onPress: actions.DELETE, combos: ['backspace', 'del'] },
  { onPress: actions.DESELECT, combos: ['ctrl+d', 'meta+d'] },
  { onPress: actions.DUPLICATE, combos: ['ctrl+shift+d', 'meta+shift+d'] },
  { onPress: actions.NUDGE_ALT_DOWN, combos: ['ctrl+down', 'meta+down'] },
  { onPress: actions.NUDGE_ALT_LEFT, combos: ['ctrl+left', 'meta+left'] },
  { onPress: actions.NUDGE_ALT_RIGHT, combos: ['ctrl+right', 'meta+right'] },
  { onPress: actions.NUDGE_ALT_UP, combos: ['ctrl+up', 'meta+up'] },
  { onPress: actions.NUDGE_DOWN, combos: ['down'] },
  { onPress: actions.NUDGE_LEFT, combos: ['left'] },
  { onPress: actions.NUDGE_RIGHT, combos: ['right'] },
  { onPress: actions.NUDGE_UP, combos: ['up'] },
  { onPress: actions.PLAYBACK_STOP, combos: ['escape'] },
  { onPress: actions.PLAYBACK_TOGGLE, combos: ['enter'] },
  { onPress: actions.REDO, combos: ['ctrl+y', 'meta+y'] },
  { onPress: actions.SELECT_ALL, combos: ['ctrl+a', 'meta+a'] },
  { onPress: actions.SELECT_TOOL_D, combos: ['d'] },
  { onPress: actions.SELECT_TOOL_E, combos: ['e'] },
  { onPress: actions.SELECT_TOOL_M, combos: ['m'] },
  { onPress: actions.SELECT_TOOL_P, combos: ['p'] },
  { onPress: actions.SELECT_TOOL_S, combos: ['s'] },
  { onPress: actions.UNDO, combos: ['ctrl+z', 'meta+z'] },
  {
    onPress: actions.SPACE_HELD,
    onRelease: actions.SPACE_RELEASED,
    combos: ['space'],
  },
];

function* handleKeypress(keypress) {
  const heldKeys = yield select(selectors.getHeldKeys);

  if (!_.includes(heldKeys, keypress.action.e.keyCode) && keypress.willRelease) {
    yield put(actions.keyHoldStarted(keypress.action.e.keyCode));
    yield put(keypress.action);
    return;
  }

  if (!keypress.isReleasing) return;

  yield put(actions.keyHoldStopped(keypress.action.e.keyCode));

  const newHeldKeys = yield select(selectors.getHeldKeys);

  if (_.includes(newHeldKeys, keypress.action.e.keyCode)) return;

  yield put(keypress.action);
}

function* initialize() {
  yield fork(registerShortcuts);
}

function* registerShortcuts() {
  const keypressChannel = keypressChannelFactory();

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
  return eventChannel(emit => {
    shortcuts.forEach(shortcut => {
      Mousetrap.bind(shortcut.combos, (e) => {
        e.preventDefault();
        emit({
          action: {
            type: shortcut.onPress,
            e,
          },
          willRelease: !!shortcut.onRelease,
        });
      });

      if (shortcut.onRelease) {
        Mousetrap.bind(shortcut.combos, e => {
          e.preventDefault();
          emit({
            action: {
              type: shortcut.onRelease,
              e,
            },
            isReleasing: true,
          });
        }, 'keyup');
      }
    });
  });
}
