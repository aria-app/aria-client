import Mousetrap from 'mousetrap';
import * as actionTypes from './action-types';

export const activateTool = (toolType) => ({
  type: actionTypes.ACTIVATE_TOOL,
  toolType,
});

export const holdPan = (e) => ({
  type: actionTypes.HOLD_PAN,
  e,
});

export const initialize = () => ({
  type: actionTypes.INITIALIZE,
});

export const releasePan = () => ({
  type: actionTypes.RELEASE_PAN,
});

export const setHeldKeys = (keys) => ({
  type: actionTypes.SET_HELD_KEYS,
  keys,
});

export function registerShortcuts(shortcuts) {
  return (dispatch) => {
    shortcuts.forEach(shortcut => {
      Mousetrap.bind(shortcut[1], (e) => {
        e.preventDefault();
        dispatch(shortcut[0]);
      }, shortcut[2]);
    });
  };
}
