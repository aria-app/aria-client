import { DiffDeleted } from 'deep-diff';

import * as actions from '../../../actions';
import { DawwwNote, DiffInterpreter } from '../../../types';

export const interpretNoteDeletedDiff: DiffInterpreter<DiffDeleted<DawwwNote>> =
  ({ lhs }) => {
    return actions.noteDeleted(lhs, lhs.id);
  };
