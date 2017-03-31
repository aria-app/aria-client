import { NAME } from './constants';

export const NEW_POINT_SET = `${NAME}/NEW_POINT_SET`;
export const STARTED = `${NAME}/STARTED`;
export const STOPPED = `${NAME}/STOPPED`;
export const UPDATED = `${NAME}/UPDATED`;

export const newPointSet = newPoint => ({
  type: NEW_POINT_SET,
  newPoint,
});

export const started = point => ({
  type: STARTED,
  point,
});

export const stopped = () => ({
  type: STOPPED,
});

export const updated = point => ({
  type: UPDATED,
  point,
});
