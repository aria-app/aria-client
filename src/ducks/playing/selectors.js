import { NAME } from './constants';

const get = state => state[NAME];

export const getTracksById = state => get(state).tracks.byId;
export const getTracksIds = state => get(state).tracks.ids;

export const getTracks = (state) =>
  getTracksIds(state).map(id => getTracksById(state)[id]);

export const getTrackById = (id) => (state) =>
  getTracksById(state)[id];

export const getActiveSynthsByTrackId = (id) => (state) => {
  const track = getTrackById(id)(state);
  return track ? track.activeSynths : undefined;
};

export const getPreviewSynthByTrackId = (id) => (state) => {
  const track = getTrackById(id)(state);
  return track ? track.previewSynth : undefined;
};

export const getSynthsByTrackId = (id) => (state) => {
  const track = getTrackById(id)(state);
  return track ? track.synths : undefined;
};
