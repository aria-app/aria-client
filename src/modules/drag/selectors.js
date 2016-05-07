import { NAME } from './constants';

const get = state => state[NAME];

const getIsDragging = state => get(state).isDragging;
const getNewPosition = state => get(state).newPosition;

export default {
  get,
  getNewPosition,
  getIsDragging,
};
