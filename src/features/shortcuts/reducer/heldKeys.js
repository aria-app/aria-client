import without from 'lodash/fp/without';
import { createReducer } from 'redux-create-reducer';
import * as actions from '../actions';

export default createReducer([], {
  [actions.HELD_KEYS_SET]: (state, action) =>
    action.keys,

  [actions.KEY_HOLD_STARTED]: (state, action) =>
    [...state, action.keyCode],

  [actions.KEY_HOLD_STOPPED]: (state, action) =>
    without([action.keyCode])(state),
});
