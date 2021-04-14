import curry from 'lodash/fp/curry';
import map from 'lodash/fp/map';

import { Note, Point } from '../../types';
import { addPoints } from './addPoints';

export const translateNote = curry<Point, Note, Note>((delta, note) => ({
  ...note,
  points: map(addPoints(delta), note.points),
}));
