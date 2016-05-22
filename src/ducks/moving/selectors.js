import { NAME } from './constants';

const get = state => state[NAME];

export const getIsMoving = state => get(state).isMoving;
export const getNewPoint = state => get(state).newPoint;
