import { NAME } from './constants';

export const CONTEXT_MENU_CLOSED = `${NAME}/CONTEXT_MENU_CLOSED`;
export const CONTEXT_MENU_ITEM_SELECTED = `${NAME}/CONTEXT_MENU_ITEM_SELECTED`;
export const CONTEXT_MENU_OPENED = `${NAME}/CONTEXT_MENU_OPENED`;

export const contextMenuClosed = () => ({
  type: CONTEXT_MENU_CLOSED,
});

export const contextMenuItemSelected = (item) => ({
  type: CONTEXT_MENU_ITEM_SELECTED,
  item,
});

export const contextMenuOpened = (items, position) => ({
  type: CONTEXT_MENU_OPENED,
  items,
  position,
});
