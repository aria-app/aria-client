import * as actionTypes from './action-types';

export const mouseMoved = (point) => ({
  type: actionTypes.MOUSE_MOVED,
  point,
});

export const mousePointSet = (point) => ({
  type: actionTypes.MOUSE_POINT_SET,
  point,
});

export const scrollLeftSet = (scrollLeft) => ({
  type: actionTypes.SCROLL_LEFT_SET,
  scrollLeft,
});

export const scrollTopSet = (scrollTop) => ({
  type: actionTypes.SCROLL_TOP_SET,
  scrollTop,
});

export const scrolledHorizontally = (scrollLeft) => ({
  type: actionTypes.SCROLLED_HORIZONTALLY,
  scrollLeft,
});

export const scrolledVertically = (scrollTop) => ({
  type: actionTypes.SCROLLED_VERTICALLY,
  scrollTop,
});

export const toolSelected = (toolType) => ({
  type: actionTypes.TOOL_SELECTED,
  toolType,
});

export const toolTypeSet = (toolType, previousToolType) => ({
  type: actionTypes.TOOL_TYPE_SET,
  previousToolType,
  toolType,
});
