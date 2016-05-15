import { NAME } from './constants';

const get = state => state[NAME];

const getIsMoving = state => get(state).isMoving;
const getNewPosition = state => get(state).newPosition;

export default {
  get,
  getNewPosition,
  getIsMoving,
};
