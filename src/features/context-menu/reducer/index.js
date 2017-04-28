import { combineReducers } from 'redux';
import contextMenuItems from './context-menu-items';
import contextMenuPosition from './context-menu-position';

export default combineReducers({
  contextMenuItems,
  contextMenuPosition,
});
