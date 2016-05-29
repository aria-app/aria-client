import _ from 'lodash';
import { NAME } from './constants';

const get = state => state[NAME];

export const getTracks = state => get(state).tracks;

export const getTrackById = (trackId) => (state) =>
  _.find(getTracks(state), { id: trackId });

export const getActiveSynthsByTrackId = (id) => (state) => {
  const track = getTrackById(id)(state);
  return track ? track.activeSynths : undefined;
};

export const getSynthsByTrackId = (id) => (state) => {
  const track = getTrackById(id)(state);
  return track ? track.synths : undefined;
};
