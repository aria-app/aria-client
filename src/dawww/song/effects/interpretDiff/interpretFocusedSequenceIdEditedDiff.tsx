import getOr from 'lodash/fp/getOr';
import * as actions from '../../../actions';

export function interpretFocusedSequenceIdEditedDiff(diff) {
  const focusedSequenceId = getOr('', 'rhs', diff);

  return actions.focusedSequenceIdEdited(focusedSequenceId);
}
