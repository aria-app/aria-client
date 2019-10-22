import curry from 'lodash/fp/curry';
import initial from 'lodash/fp/initial';
import last from 'lodash/fp/last';
import { Note, Point } from '../../types';
import { addPoints } from './addPoints';

export const resizeNote: (delta: Point, note?: Note) => Note = curry(
  (delta: Point, note: Note) => ({
    ...note,
    points: [...initial(note.points), addPoints(delta, last(note.points))],
  }),
);
