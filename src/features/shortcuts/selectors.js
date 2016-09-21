import { NAME } from './constants';

const get = state => state[NAME];

export const getHeldKeys = state => get(state).heldKeys;
