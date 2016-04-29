import { NAME } from './constants';

const getAll = state => state[NAME];

const getMeasureCount = state => getAll(state).measureCount;
const getNotes = state => getAll(state).notes;
const getSelectedNotes = state => getAll(state).selectedNotes;
const getPosition = state => getAll(state).position;
const getScale = state => getAll(state).scale;
const getSynth = state => getAll(state).synth;
const getTool = state => getAll(state).tool;

export default {
  getAll,
  getMeasureCount,
  getNotes,
  getSelectedNotes,
  getPosition,
  getScale,
  getSynth,
  getTool,
};
