import getOr from 'lodash/fp/getOr';
import memoize from 'lodash/fp/memoize';
import { createSelector } from 'reselect';
import { getSequences } from './getSequences';

export const getSequenceById = createSelector(
  getSequences,
  sequences => memoize(sequenceId => getOr({}, sequenceId, sequences)),
);
