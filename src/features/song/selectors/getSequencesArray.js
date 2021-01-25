import { createSelector } from '@reduxjs/toolkit';
import values from 'lodash/fp/values';

import { getSequences } from './getSequences';

export const getSequencesArray = createSelector(getSequences, (sequences) =>
  values(sequences),
);
