import Mousetrap from 'mousetrap';
import * as actionTypes from './action-types';

export const heldKeysSet = (keys) => ({
  type: actionTypes.HELD_KEYS_SET,
  keys,
});

export const initialized = () => ({
  type: actionTypes.INITIALIZED,
});

export const panHeld = (e) => ({
  type: actionTypes.PAN_HELD,
  e,
});

export const panReleased = () => ({
  type: actionTypes.PAN_RELEASED,
});

export const redoPressed = () => ({
  type: actionTypes.REDO_PRESSED,
});

export const shortcutsRegistered = (shortcuts) => (dispatch) =>
  shortcuts.forEach(shortcut => {
    Mousetrap.bind(shortcut[1], (e) => {
      e.preventDefault();
      dispatch(shortcut[0]);
    }, shortcut[2]);
  });

export const toolActivated = (toolType) => ({
  type: actionTypes.TOOL_ACTIVATED,
  toolType,
});

export const undoPressed = () => ({
  type: actionTypes.UNDO_PRESSED,
});
