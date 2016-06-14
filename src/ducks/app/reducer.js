import { combineReducers } from 'redux';
import shared from 'ducks/shared';

const contextMenuItems = (state = [], action) => {
  switch (action.type) {
    case shared.actionTypes.CONTEXT_MENU_OPENED:
      return action.items;
    case shared.actionTypes.CONTEXT_MENU_CLOSED:
    case shared.actionTypes.CONTEXT_MENU_ITEM_SELECTED:
      return [];
    default:
      return state;
  }
};

const contextMenuPosition = (state = { x: 0, y: 0 }, action) => {
  switch (action.type) {
    case shared.actionTypes.CONTEXT_MENU_OPENED:
      return action.position;
    case shared.actionTypes.CONTEXT_MENU_CLOSED:
    case shared.actionTypes.CONTEXT_MENU_ITEM_SELECTED:
      return {};
    default:
      return state;
  }
};

export default combineReducers({
  contextMenuItems,
  contextMenuPosition,
});
