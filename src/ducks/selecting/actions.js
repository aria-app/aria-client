import * as actionTypes from './action-types';

export const newPointSet = (newPoint) => ({
  type: actionTypes.NEW_POINT_SET,
  newPoint,
});

export const setStartPoint = (startPoint) => ({
  type: actionTypes.START_POINT_SET,
  startPoint,
});

export const started = () => ({
  type: actionTypes.STARTED,
});

export const stopped = () => ({
  type: actionTypes.STOPPED,
});

export const updated = () => ({
  type: actionTypes.UPDATED,
});
