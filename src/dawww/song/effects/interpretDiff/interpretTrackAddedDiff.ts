import getOr from 'lodash/fp/getOr';
import some from 'lodash/fp/some';

import * as actions from '../../../actions';

export function interpretTrackAddedDiff(diff, song) {
  const track = getOr({}, 'rhs', diff);
  const tracks = getOr({}, 'tracks', song);
  const isAnyTrackSoloing = some(getOr(false, 'isSoloing'), tracks);

  return actions.trackAdded({ isAnyTrackSoloing, track });
}
