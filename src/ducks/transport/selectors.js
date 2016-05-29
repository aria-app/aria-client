import { NAME } from './constants';

const get = state => state[NAME];

export const getActiveSynths = state => get(state).activeSynths;
export const getBpm = state => get(state).bpm;
export const getPlaybackState = state => get(state).playbackState;
export const getPosition = state => get(state).position;
export const getScale = state => get(state).scale;
export const getSequences = state => get(state).sequences;
export const getSynths = state => get(state).synths;
