import * as actionTypes from './action-types';

export const setNewPoint = (newPoint) => ({
  type: actionTypes.SET_NEW_POINT,
  newPoint,
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
