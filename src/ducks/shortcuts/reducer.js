import { combineReducers } from 'redux';
import * as actionTypes from './action-types';

const heldKeys = (state = [], action) => {
  switch (action.type) {
    case actionTypes.HELD_KEYS_SET:
      return action.keys;
    default:
      return state;
  }
};

export default combineReducers({
  heldKeys,
});
