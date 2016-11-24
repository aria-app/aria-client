import { NAME } from './constants';

export const DELETE = `${NAME}/DELETE`;
export const DESELECT = `${NAME}/DESELECT`;
export const DUPLICATE = `${NAME}/DUPLICATE`;
export const HELD_KEYS_SET = `${NAME}/HELD_KEYS_SET`;
export const KEY_HOLD_STARTED = `${NAME}/KEY_HOLD_STARTED`;
export const KEY_HOLD_STOPPED = `${NAME}/KEY_HOLD_STOPPED`;
export const NUDGE_ALT_DOWN = `${NAME}/NUDGE_ALT_DOWN`;
export const NUDGE_ALT_LEFT = `${NAME}/NUDGE_ALT_LEFT`;
export const NUDGE_ALT_RIGHT = `${NAME}/NUDGE_ALT_RIGHT`;
export const NUDGE_ALT_UP = `${NAME}/NUDGE_ALT_UP`;
export const NUDGE_DOWN = `${NAME}/NUDGE_DOWN`;
export const NUDGE_LEFT = `${NAME}/NUDGE_LEFT`;
export const NUDGE_RIGHT = `${NAME}/NUDGE_RIGHT`;
export const NUDGE_UP = `${NAME}/NUDGE_UP`;
export const PLAYBACK_STOP = `${NAME}/PLAYBACK_STOP`;
export const PLAYBACK_TOGGLE = `${NAME}/PLAYBACK_TOGGLE`;
export const REDO = `${NAME}/REDO`;
export const SELECT_ALL = `${NAME}/SELECT_ALL`;
export const SELECT_TOOL_D = `${NAME}/SELECT_TOOL_D`;
export const SELECT_TOOL_E = `${NAME}/SELECT_TOOL_E`;
export const SELECT_TOOL_M = `${NAME}/SELECT_TOOL_M`;
export const SELECT_TOOL_P = `${NAME}/SELECT_TOOL_P`;
export const SELECT_TOOL_S = `${NAME}/SELECT_TOOL_S`;
export const PAN_HELD = `${NAME}/PAN_HELD`;
export const PAN_RELEASED = `${NAME}/PAN_RELEASED`;
export const UNDO = `${NAME}/UNDO`;

export const heldKeysSet = (keys) => ({
  type: HELD_KEYS_SET,
  keys,
});

export const keyHoldStarted = (keyCode) => ({
  type: KEY_HOLD_STARTED,
  keyCode,
});

export const keyHoldStopped = (keyCode) => ({
  type: KEY_HOLD_STOPPED,
  keyCode,
});
