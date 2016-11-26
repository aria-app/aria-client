import { NAME } from './constants';

export const INITIALIZED = `${NAME}/INITIALIZED`;
export const WINDOW_HEIGHT_CHANGED = `${NAME}/WINDOW_HEIGHT_CHANGED`;
export const WINDOW_WIDTH_CHANGED = `${NAME}/WINDOW_WIDTH_CHANGED`;

export const initialized = () => ({
  type: INITIALIZED,
});

export const windowHeightChanged = height => ({
  type: WINDOW_HEIGHT_CHANGED,
  height,
});

export const windowWidthChanged = width => ({
  type: WINDOW_WIDTH_CHANGED,
  width,
});
