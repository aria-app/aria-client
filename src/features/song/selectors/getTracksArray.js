import pipe from 'lodash/fp/pipe';
import map from 'lodash/fp/map';
import { getTrackById } from './getTrackById';
import { getTracks } from './getTracks';

export const getTracksArray = state =>
  pipe(
    getTracks,
    Object.keys,
    map(id => getTrackById(id)(state)),
  )(state);
