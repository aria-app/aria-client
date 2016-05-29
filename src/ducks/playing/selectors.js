import { NAME } from './constants';

const get = state => state[NAME];

export const getActiveSynths = state => get(state).activeSynths;
export const getSynths = state => get(state).synths;
