import getOr from 'lodash/fp/getOr';
import some from 'lodash/fp/some';

import { StateRoot } from '../types';

export const getIsAnyTrackSoloing: (stateRoot: StateRoot) => boolean = (
  stateRoot,
) => {
  const tracks = getOr({}, 'song.tracks', stateRoot);
  return some(getOr(false, 'isSoloing'), tracks);
};
