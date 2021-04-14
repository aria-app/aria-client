import curry from 'lodash/fp/curry';
import initial from 'lodash/fp/initial';
import last from 'lodash/fp/last';

import { addPoints } from './addPoints';

export const resizeNote = curry((delta, note) => ({
  ...note,
  points: [...initial(note.points), addPoints(delta, last(note.points))],
}));
