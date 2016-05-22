import _ from 'lodash';
import Mousetrap from 'mousetrap';
import notes from 'modules/notes';
import sequence from 'modules/sequence';
import shared from 'modules/shared';
import sound from 'modules/sound';
import actionTypes from './action-types';
import selectors from './selectors';

export function initialize() {
  return (dispatch) => {
    dispatch(registerShortcuts([
      // Notes
      [notes.actions.deselect, ['ctrl+d', 'meta+d']],
      [notes.actions.duplicate, ['ctrl+shift+d', 'meta+shift+d']],
      [notes.actions.removeSelected, ['backspace', 'del']],
      [notes.actions.selectAll, ['ctrl+a', 'meta+a']],
      [notes.actions.setSelectedNoteSizes(0), ['ctrl+1', 'meta+1']],
      [notes.actions.setSelectedNoteSizes(1), ['ctrl+2', 'meta+2']],
      [notes.actions.setSelectedNoteSizes(2), ['ctrl+3', 'meta+3']],
      [notes.actions.setSelectedNoteSizes(3), ['ctrl+4', 'meta+4']],
      [notes.actions.resizeSelected({ x: 0, y: -1 }), ['ctrl+up', 'meta+up']],
      [notes.actions.resizeSelected({ x: 1, y: 0 }), ['ctrl+right', 'meta+right']],
      [notes.actions.resizeSelected({ x: 0, y: 1 }), ['ctrl+down', 'meta+down']],
      [notes.actions.resizeSelected({ x: -1, y: 0 }), ['ctrl+left', 'meta+left']],
      [notes.actions.nudgeSelectedNotes({ x: 0, y: -1 }), ['up']],
      [notes.actions.nudgeSelectedNotes({ x: 0, y: 1 }), ['down']],
      [notes.actions.nudgeSelectedNotes({ x: -1, y: 0 }), ['left']],
      [notes.actions.nudgeSelectedNotes({ x: 1, y: 0 }), ['right']],
      [notes.actions.redo, ['ctrl+y', 'meta+y']],
      [notes.actions.undo, ['ctrl+z', 'meta+z']],

      // Playback
      [sound.actions.togglePlayPause, ['enter']],
      [sound.actions.stop, ['escape']],

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
    const currentToolType = sequence.selectors.getToolType(getState());

    if (currentToolType === toolType) return;

    dispatch(sequence.actions.setToolType(toolType));
  };
}

function holdPan(e) {
  e.preventDefault();
  return (dispatch, getState) => {
    const heldKeys = selectors.getHeldKeys(getState());

    if (_.includes(heldKeys, e.keyCode)) return;

    const toolType = shared.constants.toolTypes.PAN;
    const currentToolType = sequence.selectors.getToolType(getState());

    if (currentToolType === toolType) return;

    dispatch(sequence.actions.setToolType(toolType));
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
    const previousToolType = sequence.selectors.getPreviousToolType(getState());

    if (!previousToolType || previousToolType === shared.constants.toolTypes.PAN) return;

    dispatch(sequence.actions.setToolType(previousToolType));
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
