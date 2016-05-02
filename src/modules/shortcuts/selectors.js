import { NAME } from './constants';

const get = state => state[NAME];

const getHeldKeys = state => get(state).heldKeys;

export default {
  get,
  getHeldKeys,
};
