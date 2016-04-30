import { NAME } from './constants';

const get = state => state[NAME];

const getBpm = state => get(state).bpm;
const getPlaybackState = state => get(state).playbackState;
const getPosition = state => get(state).position;
const getScale = state => get(state).scale;
const getSynth = state => get(state).synth;

export default {
  get,
  getBpm,
  getPlaybackState,
  getPosition,
  getScale,
  getSynth,
};
