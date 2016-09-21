import { combineReducers } from 'redux';
import * as actions from './actions';

const heldKeys = (state = [], action) => {
  switch (action.type) {
    case actions.HELD_KEYS_SET:
      return action.keys;
    default:
      return state;
  }
};

export default combineReducers({
  heldKeys,
});
