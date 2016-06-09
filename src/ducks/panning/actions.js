import * as actionTypes from './action-types';

export const setStartPoint = (startPoint) => ({
  type: actionTypes.SET_START_POINT,
  startPoint,
});

export const start = (scrollLeftElement, scrollTopElement, e) => ({
  type: actionTypes.START,
  e,
  scrollLeftElement,
  scrollTopElement,
});

export const stop = () => ({
  type: actionTypes.STOP,
});

export const update = (scrollLeftElement, scrollTopElement, e) => ({
  type: actionTypes.UPDATE,
  e,
  scrollLeftElement,
  scrollTopElement,
});
