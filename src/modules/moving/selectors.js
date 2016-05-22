import { NAME } from './constants';

const get = state => state[NAME];

export const getIsMoving = state => get(state).isMoving;
export const getNewPosition = state => get(state).newPosition;
