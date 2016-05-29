import _ from 'lodash';
import { createSelector } from 'reselect';
import { NAME } from './constants';

const get = state => state[NAME];

export const getActiveSequenceId = (state) => get(state).activeSequenceId;
export const getId = (state) => get(state).id;
export const getSong = (state) => get(state).song;
export const getSequences = (state) => getSong(state).sequences;
export const getTracks = (state) => getSong(state).tracks;

export const getActiveSequence = createSelector(
  getSequences,
  getActiveSequenceId,
  (sequences, activeSequenceId) => _.find(sequences, {
    id: activeSequenceId,
  }),
);

export const getActiveNotes = createSelector(
  getActiveSequence,
  (activeSequence) => (activeSequence ? activeSequence.notes : []),
);

export const getTracksWithSequences = createSelector(
  getTracks,
  getSequences,
  (tracks, sequences) => tracks.map(t => ({
    ...t,
    sequences: sequences.filter(s => s.trackId === t.id),
  })),
);

export const createGetNotesById = (id) => createSelector(
  getSequences,
  (sequences) => _.find(sequences, { id }).notes,
);

export const createGetTrackById = (id) => createSelector(
  getSequences,
  getTracks,
  (sequences, tracks) => {
    const trackId = _.find(sequences, { id }).trackId;
    return _.find(tracks, { id: trackId });
  },
);
