import values from 'lodash/fp/values';
import { createSelector } from 'redux-starter-kit';
import { getTracks } from './getTracks';

export const getTracksArray = createSelector(
  getTracks,
  tracks => values(tracks),
);
