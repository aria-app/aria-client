import * as actionTypes from './action-types';

export const heldKeysSet = (keys) => ({
  type: actionTypes.HELD_KEYS_SET,
  keys,
});
