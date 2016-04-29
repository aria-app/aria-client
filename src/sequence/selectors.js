import { NAME } from './constants';

const get = state => state[NAME];

const getMeasureCount = state => get(state).measureCount;
const getNotes = state => get(state).notes;
const getPosition = state => get(state).position;
const getScale = state => get(state).scale;
const getSelectedNotes = state => get(state).selectedNotes;
const getSynth = state => get(state).synth;
const getTool = state => get(state).tool;

export default {
  get,
  getMeasureCount,
  getNotes,
  getSelectedNotes,
  getPosition,
  getScale,
  getSynth,
  getTool,
};
