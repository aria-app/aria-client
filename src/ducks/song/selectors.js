import _ from 'lodash';
import { createSelector } from 'reselect';
import { NAME } from './constants';

const get = state => state[NAME];

export const getActiveSequenceId = (state) => get(state).activeSequenceId;
export const getSong = (state) => get(state).song;

export const getBPM = (state) =>
  (getSong(state).bpm);

export const getMeasureCount = (state) =>
  (getSong(state).measureCount);

export const getSequences = (state) =>
  (getSong(state).sequences);

export const getTracks = (state) =>
  (getSong(state).tracks);

export const getActiveSequence = createSelector(
  getSequences,
  getActiveSequenceId,
  (sequences, activeSequenceId) => _.find(sequences, {
    id: activeSequenceId,
  }),
);

export const getActiveMeasureCount = createSelector(
  getActiveSequence,
  (activeSequence) => (activeSequence ? activeSequence.measureCount : 0),
);

export const getActiveNotes = createSelector(
  getActiveSequence,
  (activeSequence) => (activeSequence ? activeSequence.notes : []),
);

export const getSequenceById = (state, id) =>
  _.find(getSequences(state), { id });

export const getTrackById = (state, id) =>
  _.find(getTracks(state), { id });

export const getTracksWithSequences = createSelector(
  getTracks,
  getSequences,
  (tracks, sequences) => tracks.map(track => ({
    ...track,
    sequences: sequences.filter(s => s.trackId === track.id),
  })),
);

export const createGetNotesById = (id) => createSelector(
  getSequences,
  (sequences) => _.find(sequences, { id }).notes,
);
