import values from 'lodash/fp/values';
import { createSelector } from 'reselect';
import { getSequences } from './getSequences';

export const getSequencesArray = createSelector(
  getSequences,
  sequences => values(sequences),
);
