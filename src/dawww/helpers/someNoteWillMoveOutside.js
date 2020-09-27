import compose from 'lodash/fp/compose';
import get from 'lodash/fp/get';
import map from 'lodash/fp/map';
import some from 'lodash/fp/some';

import * as constants from '../constants';
import { addPoints } from './addPoints';

function isOutOfBounds(measureCount) {
  return some(
    (point) =>
      point.x < 0 ||
      point.x > measureCount * 8 * 4 - 1 ||
      point.y < 0 ||
      point.y > constants.OCTAVE_RANGE.length * 12 - 1,
  );
}

export function someNoteWillMoveOutside(measureCount, delta, notes) {
  const hasPointOutside = compose(
    isOutOfBounds(measureCount),
    map(addPoints(delta)),
    get('points'),
  );
  return some(hasPointOutside, notes);
}
