import * as actionTypes from './action-types';

export const contextMenuClosed = () => ({
  type: actionTypes.CONTEXT_MENU_CLOSED,
});

export const contextMenuItemSelected = (item) => ({
  type: actionTypes.CONTEXT_MENU_ITEM_SELECTED,
  item,
});

export const contextMenuOpened = (items, position) => ({
  type: actionTypes.CONTEXT_MENU_OPENED,
  items,
  position,
});
