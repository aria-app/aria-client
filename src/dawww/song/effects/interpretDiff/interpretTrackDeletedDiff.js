import getOr from 'lodash/fp/getOr';

import * as actions from '../../../actions';

export function interpretTrackDeletedDiff(diff) {
  const track = getOr({}, 'lhs', diff);

  return actions.trackDeletionRequested(track);
}
