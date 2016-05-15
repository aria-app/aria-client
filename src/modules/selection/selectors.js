import { NAME } from './constants';

const get = state => state[NAME];

export const getIsSelecting = state => get(state).isSelecting;
export const getNewPosition = state => get(state).newPosition;
export const getStartPosition = state => get(state).startPosition;
