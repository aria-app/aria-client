import { createReducer } from 'redux-create-reducer';
import * as actions from '../actions';

export default createReducer({}, {
  [actions.CONTEXT_MENU_CLOSED]: () =>
    ({}),

  [actions.CONTEXT_MENU_ITEM_SELECTED]: () =>
    ({}),

  [actions.CONTEXT_MENU_OPENED]: (state, action) =>
    action.position,
});
