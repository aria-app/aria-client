import { NAME } from './constants';

export const MOUSE_MOVED = `${NAME}/MOUSE_MOVED`;
export const MOUSE_POINT_SET = `${NAME}/MOUSE_POINT_SET`;
export const SCROLL_LEFT_SET = `${NAME}/SCROLL_LEFT_SET`;
export const SCROLL_TOP_SET = `${NAME}/SCROLL_TOP_SET`;
export const SCROLLED_HORIZONTALLY = `${NAME}/SCROLLED_HORIZONTALLY`;
export const SCROLLED_VERTICALLY = `${NAME}/SCROLLED_VERTICALLY`;

export const mouseMoved = point => ({
  type: MOUSE_MOVED,
  point,
});

export const mousePointSet = point => ({
  type: MOUSE_POINT_SET,
  point,
});

export const scrollLeftSet = scrollLeft => ({
  type: SCROLL_LEFT_SET,
  scrollLeft,
});

export const scrollTopSet = scrollTop => ({
  type: SCROLL_TOP_SET,
  scrollTop,
});

export const scrolledHorizontally = scrollLeft => ({
  type: SCROLLED_HORIZONTALLY,
  scrollLeft,
});

export const scrolledVertically = scrollTop => ({
  type: SCROLLED_VERTICALLY,
  scrollTop,
});
