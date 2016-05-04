import _ from 'lodash';
import Mousetrap from 'mousetrap';
import notes from 'modules/notes';
import sequence from 'modules/sequence';
import sound from 'modules/sound';
import actionTypes from './actionTypes';
import selectors from './selectors';

export function initialize() {
  return (dispatch) => {
    dispatch(registerShortcuts([
      // Tools
      [activateDrawTool, ['d']],
      [activateEraseTool, ['e']],
      [activateMoveTool, ['m']],
      [activatePanTool, ['p']],
      [activateSelectTool, ['s']],

      // Playback
      [togglePlayPause, ['enter']],
      [stop, ['escape']],

      // Notes
      [notes.actions.deselect, ['ctrl+d', 'meta+d']],
      [notes.actions.duplicate, ['ctrl+shift+d', 'meta+shift+d']],
      [notes.actions.removeSelected, ['backspace', 'del']],
      [notes.actions.selectAll, ['ctrl+a', 'meta+a']],
      [nudgeSelectedNotes({ x: 0, y: -1 }), ['up']],
      [nudgeSelectedNotes({ x: 0, y: 1 }), ['down']],
      [nudgeSelectedNotes({ x: -1, y: 0 }), ['left']],
      [nudgeSelectedNotes({ x: 1, y: 0 }), ['right']],
    ]));


    // Held Key Shortcuts
    Mousetrap.bind('space', (e) => dispatch(holdPan(e)), 'keydown');
    Mousetrap.bind('space', () => dispatch(revertPan()), 'keyup');
  };
}

function registerShortcuts(shortcuts) {
  return (dispatch) => {
    shortcuts.forEach(shortcut => {
      Mousetrap.bind(shortcut[1], e => dispatch(safelyPerform(shortcut[0], e)), shortcut[2]);
    });
  };
}

function safelyPerform(action, e) {
  return (dispatch) => {
    e.preventDefault();
    dispatch(action());
  };
}

function activateDrawTool() {
  return (dispatch, getState) => {
    const toolType = sequence.constants.toolTypes.DRAW;
    const currentToolType = sequence.selectors.getToolType(getState());

    if (currentToolType === toolType) return;

    dispatch(sequence.actions.setToolType(toolType));
  };
}

function activateEraseTool() {
  return (dispatch, getState) => {
    const toolType = sequence.constants.toolTypes.ERASE;
    const currentToolType = sequence.selectors.getToolType(getState());

    if (currentToolType === toolType) return;

    dispatch(sequence.actions.setToolType(toolType));
  };
}

function activateMoveTool() {
  return (dispatch, getState) => {
    const toolType = sequence.constants.toolTypes.MOVE;
    const currentToolType = sequence.selectors.getToolType(getState());

    if (currentToolType === toolType) return;

    dispatch(sequence.actions.setToolType(toolType));
  };
}

function activatePanTool() {
  return (dispatch, getState) => {
    const toolType = sequence.constants.toolTypes.PAN;
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

    const toolType = sequence.constants.toolTypes.PAN;
    const currentToolType = sequence.selectors.getToolType(getState());

    if (currentToolType === toolType) return;

    dispatch(sequence.actions.setToolType(toolType));
    dispatch(setHeldKeys([e.keyCode]));
  };
}

function revertPan() {
  return (dispatch, getState) => {
    const previousToolType = sequence.selectors.getPreviousToolType(getState());

    if (!previousToolType || previousToolType === sequence.constants.toolTypes.PAN) return;

    dispatch(sequence.actions.setToolType(previousToolType));
    dispatch(setHeldKeys([]));
  };
}

function activateSelectTool() {
  return (dispatch, getState) => {
    const toolType = sequence.constants.toolTypes.SELECT;
    const currentToolType = sequence.selectors.getToolType(getState());

    if (currentToolType === toolType) return;

    dispatch(sequence.actions.setToolType(toolType));
  };
}

function nudgeSelectedNotes(offset) {
  return () => (dispatch, getState) => {
    const selectedNotes = notes.selectors.getSelectedNotes(getState());

    if (_.isEmpty(selectedNotes)) return;

    dispatch(notes.actions.move(selectedNotes, offset));
  };
}

function setHeldKeys(heldKeys) {
  return {
    type: actionTypes.SET_HELD_KEYS,
    heldKeys,
  };
}

function stop() {
  return (dispatch) => {
    dispatch(sound.actions.stop());
  };
}

function togglePlayPause() {
  return (dispatch) => {
    dispatch(sound.actions.togglePlayPause());
  };
}
