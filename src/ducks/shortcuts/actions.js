import _ from 'lodash';
import Mousetrap from 'mousetrap';
import notes from 'ducks/notes';
import sequencer from 'ducks/sequencer';
import shared from 'ducks/shared';
import transport from 'ducks/transport';
import * as actionTypes from './action-types';
import * as selectors from './selectors';

export function initialize() {
  return (dispatch) => {
    dispatch(registerShortcuts([
      // Notes
      [notes.actions.deselectAll, ['ctrl+d', 'meta+d']],
      [notes.actions.duplicate, ['ctrl+shift+d', 'meta+shift+d']],
      [notes.actions.nudgeSelectedNotesPosition({ x: 0, y: -1 }), ['up']],
      [notes.actions.nudgeSelectedNotesPosition({ x: 0, y: 1 }), ['down']],
      [notes.actions.nudgeSelectedNotesPosition({ x: -1, y: 0 }), ['left']],
      [notes.actions.nudgeSelectedNotesPosition({ x: 1, y: 0 }), ['right']],
      [notes.actions.nudgeSelectedNotesSize({ x: 0, y: -1 }), ['ctrl+up', 'meta+up']],
      [notes.actions.nudgeSelectedNotesSize({ x: 1, y: 0 }), ['ctrl+right', 'meta+right']],
      [notes.actions.nudgeSelectedNotesSize({ x: 0, y: 1 }), ['ctrl+down', 'meta+down']],
      [notes.actions.nudgeSelectedNotesSize({ x: -1, y: 0 }), ['ctrl+left', 'meta+left']],
      [notes.actions.removeSelected, ['backspace', 'del']],
      [notes.actions.resizeSelected(1), ['ctrl+1', 'meta+1']],
      [notes.actions.resizeSelected(2), ['ctrl+2', 'meta+2']],
      [notes.actions.resizeSelected(4), ['ctrl+3', 'meta+3']],
      [notes.actions.resizeSelected(8), ['ctrl+4', 'meta+4']],
      [notes.actions.redo, ['ctrl+y', 'meta+y']],
      [notes.actions.selectAll, ['ctrl+a', 'meta+a']],
      [notes.actions.undo, ['ctrl+z', 'meta+z']],

      // Playback
      [transport.actions.togglePlayPause, ['enter']],
      [transport.actions.stop, ['escape']],

      // Tools
      [activateTool(shared.constants.toolTypes.DRAW), ['d']],
      [activateTool(shared.constants.toolTypes.ERASE), ['e']],
      [activateTool(shared.constants.toolTypes.MOVE), ['m']],
      [activateTool(shared.constants.toolTypes.PAN), ['p']],
      [activateTool(shared.constants.toolTypes.SELECT), ['s']],
    ]));

    // Held Keys
    Mousetrap.bind('space', (e) => dispatch(holdPan(e)), 'keydown');
    Mousetrap.bind('space', () => dispatch(revertPan()), 'keyup');
  };
}

function activateTool(toolType) {
  return () => (dispatch, getState) => {
    const currentToolType = sequencer.selectors.getToolType(getState());

    if (currentToolType === toolType) return;

    dispatch(sequencer.actions.setToolType(toolType));
  };
}

function holdPan(e) {
  e.preventDefault();
  return (dispatch, getState) => {
    const heldKeys = selectors.getHeldKeys(getState());

    if (_.includes(heldKeys, e.keyCode)) return;

    const toolType = shared.constants.toolTypes.PAN;
    const currentToolType = sequencer.selectors.getToolType(getState());

    if (currentToolType === toolType) return;

    dispatch(sequencer.actions.setToolType(toolType));
    dispatch(setHeldKeys([e.keyCode]));
  };
}

function registerShortcuts(shortcuts) {
  return (dispatch) => {
    shortcuts.forEach(shortcut => {
      Mousetrap.bind(shortcut[1], e => dispatch(safelyPerform(shortcut[0], e)), shortcut[2]);
    });
  };
}

function revertPan() {
  return (dispatch, getState) => {
    const previousToolType = sequencer.selectors.getPreviousToolType(getState());

    if (!previousToolType || previousToolType === shared.constants.toolTypes.PAN) return;

    dispatch(sequencer.actions.setToolType(previousToolType));
    dispatch(setHeldKeys([]));
  };
}

function safelyPerform(action, e) {
  return (dispatch) => {
    e.preventDefault();
    dispatch(action());
  };
}

function setHeldKeys(heldKeys) {
  return {
    type: actionTypes.SET_HELD_KEYS,
    heldKeys,
  };
}
