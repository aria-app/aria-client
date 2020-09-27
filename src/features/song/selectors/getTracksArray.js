import values from 'lodash/fp/values';
import { createSelector } from '@reduxjs/toolkit';

import { getTracks } from './getTracks';

export const getTracksArray = createSelector(getTracks, (tracks) =>
  values(tracks),
);
