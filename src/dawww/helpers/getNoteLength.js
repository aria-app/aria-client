import compose from 'lodash/fp/compose';
import first from 'lodash/fp/first';
import getOr from 'lodash/fp/getOr';
import last from 'lodash/fp/last';
import { sizeToTime } from './sizeToTime';

export function getNoteLength(note, toneAdapter) {
  const start = compose(
    getOr(0, 'x'),
    first,
    getOr([], 'points'),
  )(note);
  const end = compose(
    getOr(start + 1, 'x'),
    last,
    getOr([], 'points'),
  )(note);

  return sizeToTime(end - start, toneAdapter);
}
