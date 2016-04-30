import { NAME } from './constants';

const get = state => state[NAME];

const getBpm = state => get(state).bpm;
const getMeasureCount = state => get(state).measureCount;
const getNotes = state => get(state).notes;
const getPlaybackState = state => get(state).playbackState;
const getPosition = state => get(state).position;
const getScale = state => get(state).scale;
const getSelectedNotes = state => get(state).selectedNotes;
const getSynthType = state => get(state).synthType;
const getTool = state => get(state).tool;

export default {
  get,
  getBpm,
  getMeasureCount,
  getNotes,
  getSelectedNotes,
  getPlaybackState,
  getPosition,
  getScale,
  getSynthType,
  getTool,
};
