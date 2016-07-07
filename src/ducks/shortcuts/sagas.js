import _ from 'lodash';
import { takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import Mousetrap from 'mousetrap';
import sequencing from '../sequencing';
import shared from '../shared';
import * as actions from './actions';
import * as t from './action-types';
import * as selectors from './selectors';

const shortcuts = [
  [{ type: t.DELETE }, ['backspace', 'del']],
  [{ type: t.DESELECT }, ['ctrl+d', 'meta+d']],
  [{ type: t.DUPLICATE }, ['ctrl+shift+d', 'meta+shift+d']],
  [{ type: t.NUDGE_ALT_DOWN }, ['ctrl+down', 'meta+down']],
  [{ type: t.NUDGE_ALT_LEFT }, ['ctrl+left', 'meta+left']],
  [{ type: t.NUDGE_ALT_RIGHT }, ['ctrl+right', 'meta+right']],
  [{ type: t.NUDGE_ALT_UP }, ['ctrl+up', 'meta+up']],
  [{ type: t.NUDGE_DOWN }, ['down']],
  [{ type: t.NUDGE_LEFT }, ['left']],
  [{ type: t.NUDGE_RIGHT }, ['right']],
  [{ type: t.NUDGE_UP }, ['up']],
  [{ type: t.PLAYBACK_STOP }, ['escape']],
  [{ type: t.PLAYBACK_TOGGLE }, ['enter']],
  [{ type: t.REDO }, ['ctrl+y', 'meta+y']],
  [{ type: t.SELECT_ALL }, ['ctrl+a', 'meta+a']],
  [{ type: t.SELECT_TOOL_D }, ['d']],
  [{ type: t.SELECT_TOOL_E }, ['e']],
  [{ type: t.SELECT_TOOL_M }, ['m']],
  [{ type: t.SELECT_TOOL_P }, ['p']],
  [{ type: t.SELECT_TOOL_S }, ['s']],
  [{ type: t.UNDO }, ['ctrl+z', 'meta+z']],
];

function* holdPan({ e }) {
  e.preventDefault();
  const heldKeys = yield select(selectors.getHeldKeys);

  if (_.includes(heldKeys, e.keyCode)) return;

  const toolType = shared.constants.toolTypes.PAN;
  const currentToolType = yield select(sequencing.selectors.getToolType);

  if (currentToolType === toolType) return;

  yield put(sequencing.actions.selectTool(toolType));
  yield put(actions.setHeldKeys([e.keyCode]));
}

function* initialize() {
  yield put(actions.shortcutsRegistered(shortcuts));

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const action = yield call(resolveOnShortcut);
    yield put(action);
  }
}

function* releasePan() {
  const previousToolType = yield select(sequencing.selectors.getPreviousToolType);

  if (!previousToolType || previousToolType === shared.constants.toolTypes.PAN) return;

  yield put(sequencing.actions.selectTool(previousToolType));
  yield put(actions.heldKeysSet([]));
}

export default function* saga() {
  yield [
    takeEvery(t.INITIALIZED, initialize),
    takeEvery(t.PAN_HELD, holdPan),
    takeEvery(t.PAN_RELEASED, releasePan),
  ];
}

function resolveOnShortcut() {
  return new Promise(resolve => {
    // Held Keys
    Mousetrap.bind('space', (e) => resolve(actions.panHeld(e)), 'keydown');
    Mousetrap.bind('space', () => resolve(actions.panReleased()), 'keyup');
  });
}
