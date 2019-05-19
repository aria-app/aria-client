import values from 'lodash/fp/values';
import { createSelector } from 'reselect';
import { getNotes } from './getNotes';

export const getNotesArray = createSelector(
  getNotes,
  notes => values(notes),
);
