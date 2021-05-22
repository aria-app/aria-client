import * as actions from '../../../actions';
import { DiffInterpreter } from '../../../types';
import { interpretSequenceAddedDiff } from './interpretSequenceAddedDiff';
import { interpretSequenceDeletedDiff } from './interpretSequenceDeletedDiff';
import { interpretSequenceEditedDiff } from './interpretSequenceEditedDiff';

export const interpretSequencesDiff: DiffInterpreter = (diff) => {
  switch (diff.kind) {
    case 'D':
      return interpretSequenceDeletedDiff(diff);
    case 'E':
      return interpretSequenceEditedDiff(diff);
    case 'N':
      return interpretSequenceAddedDiff(diff);
    default:
      return actions.unknown();
  }
};
