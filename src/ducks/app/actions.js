import * as actionTypes from './action-types';

export const closeContextMenu = () => ({
  type: actionTypes.CLOSE_CONTEXT_MENU,
});

export const initialize = () => ({
  type: actionTypes.INITIALIZE,
});

export const openContextMenu = (items, position) => ({
  type: actionTypes.OPEN_CONTEXT_MENU,
  items,
  position,
});
