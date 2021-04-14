import curry from 'lodash/fp/curry';
import map from 'lodash/fp/map';

import { addPoints } from './addPoints';

export const translateNote = curry((delta, note) => ({
  ...note,
  points: map(addPoints(delta), note.points),
}));
