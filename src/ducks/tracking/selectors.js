import { NAME } from './constants';

const get = state => state[NAME];

export const getSelectedSequenceIds = state => get(state).selectedSequenceIds;
