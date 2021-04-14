import { Point } from '../../types';

type GetPointOffset = (start: Point, end: Point) => Point;

export const getPointOffset: GetPointOffset = (start, end) => {
  return {
    x: end.x - start.x,
    y: end.y - start.y,
  };
};
