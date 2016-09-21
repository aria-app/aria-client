import * as constants from './constants';

const get = state => state[constants.NAME];

export const getActiveSynths = state => get(state).activeSynths;
export const getPlaybackState = state => get(state).playbackState;
export const getPosition = state => get(state).position;
export const getSequences = state => get(state).sequences;
export const getSongPosition = state => get(state).songPosition;
export const getSongSequence = state => get(state).songSequence;
export const getStartPoint = state => get(state).startPoint;
export const getSynths = state => get(state).synths;

export const getIsPlaying = state =>
  getPlaybackState(state) !== constants.playbackStates.STOPPED;
