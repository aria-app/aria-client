import * as actionTypes from './action-types';

export const setStartPoint = (startPoint) => ({
  type: actionTypes.START_POINT_SET,
  startPoint,
});

export const started = (scrollLeftElement, scrollTopElement, e) => ({
  type: actionTypes.STARTED,
  e,
  scrollLeftElement,
  scrollTopElement,
});

export const stopped = () => ({
  type: actionTypes.STOPPED,
});

export const updated = (scrollLeftElement, scrollTopElement, e) => ({
  type: actionTypes.UPDATED,
  e,
  scrollLeftElement,
  scrollTopElement,
});
