import filter from 'lodash/fp/filter';
import pipe from 'lodash/fp/pipe';
import location from '../../location';
import { getNotesArray } from './getNotesArray';

export const getFocusedSequenceNotes = state =>
  pipe(
    getNotesArray,
    filter({ sequenceId: location.selectors.getSequenceId(state) }),
  )(state);
