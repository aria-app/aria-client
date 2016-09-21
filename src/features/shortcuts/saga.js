import _ from 'lodash';
import { eventChannel, takeEvery } from 'redux-saga';
import { put, select, take } from 'redux-saga/effects';
import Mousetrap from 'mousetrap';
import sequencing from '../sequencing';
import shared from '../shared';
import * as actions from './actions';
import * as selectors from './selectors';

const heldShortcuts = [
  [actions.PAN_HELD, actions.PAN_RELEASED, ['space']],
];

const pressedShortcuts = [
  [actions.DELETE, ['backspace', 'del']],
  [actions.DESELECT, ['ctrl+d', 'meta+d']],
  [actions.DUPLICATE, ['ctrl+shift+d', 'meta+shift+d']],
  [actions.NUDGE_ALT_DOWN, ['ctrl+down', 'meta+down']],
  [actions.NUDGE_ALT_LEFT, ['ctrl+left', 'meta+left']],
  [actions.NUDGE_ALT_RIGHT, ['ctrl+right', 'meta+right']],
  [actions.NUDGE_ALT_UP, ['ctrl+up', 'meta+up']],
  [actions.NUDGE_DOWN, ['down']],
  [actions.NUDGE_LEFT, ['left']],
  [actions.NUDGE_RIGHT, ['right']],
  [actions.NUDGE_UP, ['up']],
  [actions.PLAYBACK_STOP, ['escape']],
  [actions.PLAYBACK_TOGGLE, ['enter']],
  [actions.REDO, ['ctrl+y', 'meta+y']],
  [actions.SELECT_ALL, ['ctrl+a', 'meta+a']],
  [actions.SELECT_TOOL_D, ['d']],
  [actions.SELECT_TOOL_E, ['e']],
  [actions.SELECT_TOOL_M, ['m']],
  [actions.SELECT_TOOL_P, ['p']],
  [actions.SELECT_TOOL_S, ['s']],
  [actions.UNDO, ['ctrl+z', 'meta+z']],
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
    takeEvery(actions.PAN_HELD, holdPan),
    takeEvery(actions.PAN_RELEASED, releasePan),
    takeEvery(shared.actions.INITIALIZED, initialize),
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
