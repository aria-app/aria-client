import * as actions from '../../../actions';
import { DiffInterpreter } from '../../../types';
import { interpretNoteAddedDiff } from './interpretNoteAddedDiff';
import { interpretNoteArrayEditedDiff } from './interpretNoteArrayEditedDiff';
import { interpretNoteDeletedDiff } from './interpretNoteDeletedDiff';
import { interpretNoteEditedDiff } from './interpretNoteEditedDiff';

export const interpretNotesDiff: DiffInterpreter = (diff) => {
  switch (diff.kind) {
    case 'A':
      return interpretNoteArrayEditedDiff(diff);
    case 'D':
      return interpretNoteDeletedDiff(diff);
    case 'E':
      return interpretNoteEditedDiff(diff);
    case 'N':
      return interpretNoteAddedDiff(diff);
    default:
      return actions.unknown();
  }
};
