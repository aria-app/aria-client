import { NAME } from './constants';

const get = state => state[NAME];

export const getToolType = state => get(state).toolType;
export const getPreviousToolType = state => get(state).previousToolType;
