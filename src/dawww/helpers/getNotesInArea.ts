import isEqual from 'lodash/fp/isEqual';

import { Note, Point } from '../../types';

type GetIsInside = (start: Point, end: Point, target: Point) => boolean;

const getIsInside: GetIsInside = (start, end, target) => {
  const tx = target.x;
  const ty = target.y;
  const x1 = Math.min(start.x, end.x);
  const x2 = Math.max(start.x, end.x);
  const y1 = Math.min(start.y, end.y);
  const y2 = Math.max(start.y, end.y);

  return x1 <= tx && tx <= x2 && y1 <= ty && ty <= y2;
};

type GetNotesInArea = (start: Point, end: Point, notes: Note[]) => Note[];

export const getNotesInArea: GetNotesInArea = (start, end, notes) => {
  if (isEqual(start, end)) return [];
  return notes.filter((n) => getIsInside(start, end, n.points[0]));
};
