import { NAME } from './constants';

const get = state => state[NAME];

export const getIsResizing = state => get(state).isResizing;
export const getNewPoint = state => get(state).newPoint;
