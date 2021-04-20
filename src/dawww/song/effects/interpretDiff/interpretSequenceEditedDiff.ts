import getOr from 'lodash/fp/getOr';
import last from 'lodash/fp/last';

import * as actions from '../../../actions';

export function interpretSequenceEditedDiff(diff) {
  const id = getOr([], 'path[1]', diff);
  const prevValue = getOr('', 'lhs', diff);
  const value = getOr('', 'rhs', diff);

  switch (last(getOr([], 'path', diff))) {
    case 'measureCount':
      return actions.sequenceMeasureCountEdited({ id, prevValue, value });
    case 'position':
      return actions.sequencePositionEdited({ id, prevValue, value });
    case 'trackId':
      return actions.sequenceTrackIdEdited({ id, prevValue, value });
    default:
      return actions.unknown();
  }
}
