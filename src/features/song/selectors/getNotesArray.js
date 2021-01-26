import { createSelector } from '@reduxjs/toolkit';
import values from 'lodash/fp/values';

import { getNotes } from './getNotes';

export const getNotesArray = createSelector(getNotes, (notes) => values(notes));
