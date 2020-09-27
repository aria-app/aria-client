import values from 'lodash/fp/values';
import { createSelector } from 'redux-starter-kit';
import { getNotes } from './getNotes';

export const getNotesArray = createSelector(getNotes, (notes) => values(notes));
