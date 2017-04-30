import { NAME } from './constants';

const get = state => state[NAME];

export const getPlaybackState = state => get(state).playbackState;
