import { NAME } from './constants';

const get = state => state[NAME];

const getIsDragging = state => get(state).isDragging;
const getOffset = state => get(state).offset;

export default {
  get,
  getOffset,
  getIsDragging,
};
