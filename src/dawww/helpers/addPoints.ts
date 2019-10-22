import curry from 'lodash/fp/curry';
import { Point } from '../../types';

export const addPoints: (b: Point, a?: Point) => Point = curry(
  (b: Point, a: Point) => ({
    x: a.x + b.x,
    y: a.y + b.y,
  }),
);
