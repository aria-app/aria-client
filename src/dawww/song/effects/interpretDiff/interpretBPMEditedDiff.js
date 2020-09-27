import getOr from 'lodash/fp/getOr';

import * as actions from '../../../actions';

export function interpretBPMEditedDiff(diff) {
  const bpm = getOr(0, 'rhs', diff);

  return actions.bpmEdited(bpm);
}
