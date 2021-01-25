import { createSelector } from '@reduxjs/toolkit';
import values from 'lodash/fp/values';

import { getTracks } from './getTracks';

export const getTracksArray = createSelector(getTracks, (tracks) =>
  values(tracks),
);
