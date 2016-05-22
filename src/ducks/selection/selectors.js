import { NAME } from './constants';

const get = state => state[NAME];

export const getIsSelecting = state => get(state).isSelecting;
export const getNewPoint = state => get(state).newPoint;
export const getStartPoint = state => get(state).startPoint;
