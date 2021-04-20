import getOr from 'lodash/fp/getOr';

import * as actions from '../../../actions';

export function interpretSequenceDeletedDiff(diff) {
  const sequence = getOr({}, 'lhs', diff);

  return actions.sequenceDeletionRequested(sequence);
}
