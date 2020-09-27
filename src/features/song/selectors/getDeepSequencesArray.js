import filter from 'lodash/fp/filter';
import map from 'lodash/fp/map';
import { createSelector } from 'redux-starter-kit';
import { getNotesArray } from './getNotesArray';
import { getSequencesArray } from './getSequencesArray';

export const getDeepSequencesArray = createSelector(
  getNotesArray,
  getSequencesArray,
  (notesArray, sequencesArray) =>
    map(
      (sequence) => ({
        ...sequence,
        notes: filter((note) => note.sequenceId === sequence.id, notesArray),
      }),
      sequencesArray,
    ),
);
