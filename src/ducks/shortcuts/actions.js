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

export const shortcutsRegistered = (shortcuts) => (dispatch) =>
  shortcuts.forEach(shortcut => {
    Mousetrap.bind(shortcut[1], (e) => {
      e.preventDefault();
      dispatch(shortcut[0]);
    }, shortcut[2]);
  });
