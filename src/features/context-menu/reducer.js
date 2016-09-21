import { combineReducers } from 'redux';
import * as actions from './actions';

const contextMenuItems = (state = [], action) => {
  switch (action.type) {
    case actions.CONTEXT_MENU_OPENED:
      return action.items;
    case actions.CONTEXT_MENU_CLOSED:
    case actions.CONTEXT_MENU_ITEM_SELECTED:
      return [];
    default:
      return state;
  }
};

const contextMenuPosition = (state = {}, action) => {
  switch (action.type) {
    case actions.CONTEXT_MENU_OPENED:
      return action.position;
    case actions.CONTEXT_MENU_CLOSED:
    case actions.CONTEXT_MENU_ITEM_SELECTED:
      return {};
    default:
      return state;
  }
};

export default combineReducers({
  contextMenuItems,
  contextMenuPosition,
});
