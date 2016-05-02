import { NAME } from './constants';

const get = state => state[NAME];

const getNote = state => get(state).note;
const getOffset = state => get(state).offset;
const getStartPosition = state => get(state).startPosition;
const getIsDragging = state => get(state).isDragging;

export default {
  get,
  getIsDragging,
  getNote,
  getOffset,
  getStartPosition,
};
