import * as actionTypes from './action-types';

export const mouseMoved = (point) => ({
  type: actionTypes.MOUSE_MOVED,
  point,
});

export const scrolledHorizontally = (scrollLeft) => ({
  type: actionTypes.SCROLLED_HORIZONTALLY,
  scrollLeft,
});

export const scrolledVertically = (scrollTop) => ({
  type: actionTypes.SCROLLED_VERTICALLY,
  scrollTop,
});

export const setMousePoint = (point) => ({
  type: actionTypes.SET_MOUSE_POINT,
  point,
});

export const setScrollLeft = (scrollLeft) => ({
  type: actionTypes.SET_SCROLL_LEFT,
  scrollLeft,
});

export const setScrollTop = (scrollTop) => ({
  type: actionTypes.SET_SCROLL_TOP,
  scrollTop,
});

export const setToolType = (toolType, previousToolType) => ({
  type: actionTypes.SET_TOOL_TYPE,
  previousToolType,
  toolType,
});

export const selectTool = (toolType) => ({
  type: actionTypes.SELECT_TOOL,
  toolType,
});
