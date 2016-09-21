import { combineReducers } from 'redux';
import * as actionTypes from './action-types';

const contextMenuItems = (state = [], action) => {
  switch (action.type) {
    case actionTypes.CONTEXT_MENU_OPENED:
      return action.items;
    case actionTypes.CONTEXT_MENU_CLOSED:
    case actionTypes.CONTEXT_MENU_ITEM_SELECTED:
      return [];
    default:
      return state;
  }
};

const contextMenuPosition = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.CONTEXT_MENU_OPENED:
      return action.position;
    case actionTypes.CONTEXT_MENU_CLOSED:
    case actionTypes.CONTEXT_MENU_ITEM_SELECTED:
      return {};
    default:
      return state;
  }
};

export default combineReducers({
  contextMenuItems,
  contextMenuPosition,
});
