import { NAME } from './constants';

const get = state => state[NAME];

export const getIsSelecting = state => get(state).isSelecting;
export const getOffset = state => get(state).offset;
export const getStartPosition = state => get(state).startPosition;
