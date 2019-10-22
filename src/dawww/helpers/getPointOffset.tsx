import { Point } from '../../types';

export function getPointOffset(start: Point, end: Point): Point {
  return {
    x: end.x - start.x,
    y: end.y - start.y,
  };
}
