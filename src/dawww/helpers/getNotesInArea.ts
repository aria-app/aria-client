import first from 'lodash/fp/first';
import isEqual from 'lodash/fp/isEqual';

const getIsInside = (start, end, target) => {
  const tx = target.x;
  const ty = target.y;
  const x1 = Math.min(start.x, end.x);
  const x2 = Math.max(start.x, end.x);
  const y1 = Math.min(start.y, end.y);
  const y2 = Math.max(start.y, end.y);

  return x1 <= tx && tx <= x2 && y1 <= ty && ty <= y2;
};

export function getNotesInArea(start, end, notes) {
  if (isEqual(start, end)) return [];
  return notes.filter((n) => getIsInside(start, end, first(n.points)));
}
