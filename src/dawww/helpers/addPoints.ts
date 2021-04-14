import curry from 'lodash/fp/curry';

import { Point } from '../../types';

export const addPoints = curry<Point, Point, Point>((b, a) => ({
  x: a.x + b.x,
  y: a.y + b.y,
}));
