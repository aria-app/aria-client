import compose from 'lodash/fp/compose';
import first from 'lodash/fp/first';
import getOr from 'lodash/fp/getOr';
import last from 'lodash/fp/last';

import { Note, Point } from '../../types';
import { sizeToTime } from './sizeToTime';

type GetNoteLength = (note: Note, toneAdapter: any) => number;

export const getNoteLength: GetNoteLength = (note, toneAdapter) => {
  const start: number = compose(
    getOr(0, 'x'),
    first,
    getOr([], 'points'),
  )(note);
  const end: number = compose(
    getOr(start + 1, 'x'),
    last,
    getOr([], 'points'),
  )(note);

  return sizeToTime(end - start, toneAdapter);
};
