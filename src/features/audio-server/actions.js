import { NAME } from './constants';

export const SEQUENCE_UPDATED = `${NAME}/SEQUENCE_UPDATED`;
export const SONG_LOADED = `${NAME}/SONG_LOADED`;
export const TRACK_UPDATED = `${NAME}/TRACK_UPDATED`;

export const sequenceUpdated = sequence => ({
  type: SEQUENCE_UPDATED,
  payload: sequence,
});

export const songLoaded = song => ({
  type: SONG_LOADED,
  payload: song,
});

export const trackUpdated = track => ({
  type: TRACK_UPDATED,
  payload: track,
});
