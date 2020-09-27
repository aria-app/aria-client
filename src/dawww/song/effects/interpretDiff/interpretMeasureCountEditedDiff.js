import getOr from 'lodash/fp/getOr';

import * as actions from '../../../actions';

export function interpretMeasureCountEditedDiff(diff) {
  const measureCount = getOr(0, 'rhs', diff);

  return actions.measureCountEdited(measureCount);
}
