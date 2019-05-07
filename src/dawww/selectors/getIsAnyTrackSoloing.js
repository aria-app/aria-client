import compose from 'lodash/fp/compose';
import getOr from 'lodash/fp/getOr';
import some from 'lodash/fp/some';

export const getIsAnyTrackSoloing = compose(
  some(getOr(false, 'isSoloing')),
  getOr({}, 'song.tracks'),
);
