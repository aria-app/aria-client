import values from 'lodash/fp/values';
import { createSelector } from 'redux-starter-kit';

import { getSequences } from './getSequences';

export const getSequencesArray = createSelector(getSequences, (sequences) =>
  values(sequences),
);
