import { NAME } from './constants';

const get = state => state[NAME];

const getActiveSynths = state => get(state).activeSynths;
const getBpm = state => get(state).bpm;
const getPlaybackState = state => get(state).playbackState;
const getPosition = state => get(state).position;
const getScale = state => get(state).scale;
const getSynths = state => get(state).synths;

export default {
  get,
  getActiveSynths,
  getBpm,
  getPlaybackState,
  getPosition,
  getScale,
  getSynths,
};
