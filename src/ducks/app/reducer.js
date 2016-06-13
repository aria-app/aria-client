import { combineReducers } from 'redux';
import * as actionTypes from './action-types';

const contextMenuItems = (state = [], action) => {
  switch (action.type) {
    case actionTypes.OPEN_CONTEXT_MENU:
      return action.items;
    case actionTypes.CLOSE_CONTEXT_MENU:
      return [];
    default:
      return state;
  }
};

const contextMenuPosition = (state = { x: 0, y: 0 }, action) => {
  switch (action.type) {
    case actionTypes.OPEN_CONTEXT_MENU:
      return action.position;
    case actionTypes.CLOSE_CONTEXT_MENU:
      return {};
    default:
      return state;
  }
};

export default combineReducers({
  contextMenuItems,
  contextMenuPosition,
});
