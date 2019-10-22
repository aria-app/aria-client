import curry from 'lodash/fp/curry';
import map from 'lodash/fp/map';
import { Note, Point } from '../../types';
import { addPoints } from './addPoints';

export const translateNote: (delta: Point, note?: Note) => Note = curry(
  (delta: Point, note: Note) => ({
    ...note,
    points: map(addPoints(delta), note.points),
  }),
);
