import * as actionTypes from './action-types';

export const setNewPoint = (newPoint) => ({
  type: actionTypes.SET_NEW_POINT,
  newPoint,
});

export const setStartPoint = (startPoint) => ({
  type: actionTypes.SET_START_POINT,
  startPoint,
});

export const start = () => ({
  type: actionTypes.START,
});

export const stop = () => ({
  type: actionTypes.STOP,
});

export const update = () => ({
  type: actionTypes.UPDATE,
});
