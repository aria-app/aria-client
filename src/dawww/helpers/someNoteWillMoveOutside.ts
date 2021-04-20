import compose from 'lodash/fp/compose';
import get from 'lodash/fp/get';
import map from 'lodash/fp/map';
import some from 'lodash/fp/some';

import { Note, Point } from '../../types';
import * as constants from '../constants';
import { addPoints } from './addPoints';

type IsOutOfBounds = (measureCount: number) => (points: Point[]) => boolean;

const isOutOfBounds: IsOutOfBounds = (measureCount) =>
  some(
    (point) =>
      point.x < 0 ||
      point.x > measureCount * 8 * 4 - 1 ||
      point.y < 0 ||
      point.y > constants.OCTAVE_RANGE.length * 12 - 1,
  );

type SomeNoteWillMoveOutside = (
  measureCount: number,
  delta: Point,
  notes: Note[],
) => boolean;

export const someNoteWillMoveOutside: SomeNoteWillMoveOutside = (
  measureCount,
  delta,
  notes,
) => {
  const hasPointOutside = compose(
    isOutOfBounds(measureCount),
    map(addPoints(delta)),
    get('points'),
  );
  return some(hasPointOutside, notes);
};
