import filter from 'lodash/fp/filter';
import pipe from 'lodash/fp/pipe';
import map from 'lodash/fp/map';
import { getDeepSequences } from './getDeepSequences';
import { getTracksArray } from './getTracksArray';

const getDeepTrack = state => track => ({
  ...track,
  sequences: pipe(
    getDeepSequences,
    filter({ trackId: track.id }),
  )(state),
});

export const getDeepTracks = state =>
  pipe(
    getTracksArray,
    map(getDeepTrack(state)),
  )(state);
