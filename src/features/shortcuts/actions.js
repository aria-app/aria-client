import { NAME } from './constants';

export const HELD_KEYS_SET = `${NAME}/HELD_KEYS_SET`;
export const KEY_HOLD_STARTED = `${NAME}/KEY_HOLD_STARTED`;
export const KEY_HOLD_STOPPED = `${NAME}/KEY_HOLD_STOPPED`;
export const PAN_HELD = `${NAME}/PAN_HELD`;
export const PAN_RELEASED = `${NAME}/PAN_RELEASED`;

export const heldKeysSet = keys => ({
  type: HELD_KEYS_SET,
  keys,
});

export const keyHoldStarted = keyCode => ({
  type: KEY_HOLD_STARTED,
  keyCode,
});

export const keyHoldStopped = keyCode => ({
  type: KEY_HOLD_STOPPED,
  keyCode,
});
