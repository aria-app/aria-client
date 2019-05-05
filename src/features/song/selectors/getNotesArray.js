import pipe from 'lodash/fp/pipe';
import map from 'lodash/fp/map';
import { getNoteById } from './getNoteById';
import { getNotes } from './getNotes';

export const getNotesArray = state =>
  pipe(
    getNotes,
    Object.keys,
    map(id => getNoteById(id)(state)),
  )(state);
