import { NAME } from './constants';

const get = state => state[NAME];

const getIsPanning = state => get(state).isPanning;
const getStartPosition = state => get(state).startPosition;

export default {
  get,
  getIsPanning,
  getStartPosition,
};
