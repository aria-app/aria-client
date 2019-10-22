import getOr from 'lodash/fp/getOr';
import * as actions from '../../../actions';

export function interpretSequenceAddedDiff(diff) {
  const sequence = getOr({}, 'rhs', diff);

  return actions.sequenceAdded(sequence);
}
