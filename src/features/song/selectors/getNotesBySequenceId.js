import { createSelector } from '@reduxjs/toolkit';
import filter from 'lodash/fp/filter';
import memoize from 'lodash/fp/memoize';

import { getNotesArray } from './getNotesArray';

export const getNotesBySequenceId = createSelector(
  getNotesArray,
  (notesArray) =>
    memoize((sequenceId) =>
      filter((note) => note.sequenceId === sequenceId, notesArray),
    ),
);
