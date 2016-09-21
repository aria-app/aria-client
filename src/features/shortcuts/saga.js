import _ from 'lodash';
import { eventChannel, takeEvery } from 'redux-saga';
import { put, select, take } from 'redux-saga/effects';
import Mousetrap from 'mousetrap';
import sequencing from '../sequencing';
import shared from '../shared';
import * as actions from './actions';
import * as t from './action-types';
import * as selectors from './selectors';

const heldShortcuts = [
  [t.PAN_HELD, t.PAN_RELEASED, ['space']],
];

const pressedShortcuts = [
  [t.DELETE, ['backspace', 'del']],
  [t.DESELECT, ['ctrl+d', 'meta+d']],
  [t.DUPLICATE, ['ctrl+shift+d', 'meta+shift+d']],
  [t.NUDGE_ALT_DOWN, ['ctrl+down', 'meta+down']],
  [t.NUDGE_ALT_LEFT, ['ctrl+left', 'meta+left']],
  [t.NUDGE_ALT_RIGHT, ['ctrl+right', 'meta+right']],
  [t.NUDGE_ALT_UP, ['ctrl+up', 'meta+up']],
  [t.NUDGE_DOWN, ['down']],
  [t.NUDGE_LEFT, ['left']],
  [t.NUDGE_RIGHT, ['right']],
  [t.NUDGE_UP, ['up']],
  [t.PLAYBACK_STOP, ['escape']],
  [t.PLAYBACK_TOGGLE, ['enter']],
  [t.REDO, ['ctrl+y', 'meta+y']],
  [t.SELECT_ALL, ['ctrl+a', 'meta+a']],
  [t.SELECT_TOOL_D, ['d']],
  [t.SELECT_TOOL_E, ['e']],
  [t.SELECT_TOOL_M, ['m']],
  [t.SELECT_TOOL_P, ['p']],
  [t.SELECT_TOOL_S, ['s']],
  [t.UNDO, ['ctrl+z', 'meta+z']],
];

function* holdPan({ e }) {
  e.preventDefault();
  const heldKeys = yield select(selectors.getHeldKeys);

  if (_.includes(heldKeys, e.keyCode)) return;

  const toolType = shared.constants.toolTypes.PAN;
  const currentToolType = yield select(sequencing.selectors.getToolType);

  if (currentToolType === toolType) return;

  yield put(sequencing.actions.toolSelected(toolType));
  yield put(actions.heldKeysSet([e.keyCode]));
}

function* initialize() {
  yield [
    registerHeldKeys(),
    registerKeypresses(),
  ];
}

function* registerHeldKeys() {
  const heldChannel = heldChannelFactory();

  while (true) {
    const heldKeyAction = yield take(heldChannel);
    yield put(heldKeyAction);
  }
}

function* registerKeypresses() {
  const pressedChannel = pressedChannelFactory();

  while (true) {
    const pressedAction = yield take(pressedChannel);
    yield put(pressedAction);
  }
}

function* releasePan() {
  const previousToolType = yield select(sequencing.selectors.getPreviousToolType);

  if (!previousToolType || previousToolType === shared.constants.toolTypes.PAN) return;

  yield put(sequencing.actions.toolSelected(previousToolType));
  yield put(actions.heldKeysSet([]));
}

export default function* saga() {
  yield [
    takeEvery(t.PAN_HELD, holdPan),
    takeEvery(t.PAN_RELEASED, releasePan),
    takeEvery(shared.actionTypes.INITIALIZED, initialize),
  ];
}

function heldChannelFactory() {
  return eventChannel(emit => {
    heldShortcuts.forEach(shortcut => {
      const downType = shortcut[0];
      const upType = shortcut[1];
      const comboKeys = shortcut[2];

      Mousetrap.bind(comboKeys, e => {
        e.preventDefault();
        emit({ type: downType, e });
      }, 'keydown');

      Mousetrap.bind(comboKeys, e => {
        e.preventDefault();
        emit({ type: upType });
      }, 'keyup');
    });
  });
}

function pressedChannelFactory() {
  return eventChannel(emit => {
    pressedShortcuts.forEach(shortcut => {
      const type = shortcut[0];
      const combo = shortcut[1];

      Mousetrap.bind(combo, (e) => {
        e.preventDefault();
        emit({ type });
      });
    });
  });
}
