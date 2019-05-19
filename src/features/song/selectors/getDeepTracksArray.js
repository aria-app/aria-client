import filter from 'lodash/fp/filter';
import map from 'lodash/fp/map';
import { createSelector } from 'reselect';
import { getDeepSequencesArray } from './getDeepSequencesArray';
import { getTracksArray } from './getTracksArray';

export const getDeepTracksArray = createSelector(
  getDeepSequencesArray,
  getTracksArray,
  (deepSequencesArray, tracksArray) =>
    map(
      track => ({
        ...track,
        sequences: filter(
          sequence => sequence.trackId === track.id,
          deepSequencesArray,
        ),
      }),
      tracksArray,
    ),
);
