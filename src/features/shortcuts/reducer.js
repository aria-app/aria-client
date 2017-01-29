import { without } from 'lodash/fp';
import { combineReducers } from 'redux';
import * as actions from './actions';

const heldKeys = (state = [], action) => {
  switch (action.type) {
    case actions.HELD_KEYS_SET:
      return action.keys;
    case actions.KEY_HOLD_STARTED:
      return [...state, action.keyCode];
    case actions.KEY_HOLD_STOPPED:
      return without([action.keyCode])(state);
    default:
      return state;
  }
};

export default combineReducers({
  heldKeys,
});
