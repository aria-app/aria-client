import { combineReducers } from 'redux';
import * as actionTypes from './action-types';

const heldKeys = (state = [], action) => {
  switch (action.type) {
    case actionTypes.SET_HELD_KEYS:
      return action.keys;
    default:
      return state;
  }
};

export default combineReducers({
  heldKeys,
});
