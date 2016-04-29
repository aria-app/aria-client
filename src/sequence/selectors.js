import { NAME } from './constants';

const get = state => state[NAME];

export const getMeasureCount = state => get(state).measureCount;
export const getNotes = state => get(state).notes;
export const getSelectedNotes = state => get(state).selectedNotes;
export const getPosition = state => get(state).position;
export const getSynth = state => get(state).synth;
export const getTool = state => get(state).tool;
