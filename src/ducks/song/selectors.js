import _ from 'lodash';
import { createSelector } from 'reselect';
import { NAME } from './constants';

const get = state => state[NAME];

export const getActiveSequenceId = (state) => get(state).activeSequenceId;
export const getSequences = (state) => get(state).sequences;
export const getTracks = (state) => get(state).tracks;

export const getActiveSequence = createSelector(
  getSequences,
  getActiveSequenceId,
  (sequences, activeSequenceId) => _.find(sequences, {
    id: activeSequenceId,
  }),
);

export const getNotes = createSelector(
  getActiveSequence,
  (activeSequence) => activeSequence.notes,
);
