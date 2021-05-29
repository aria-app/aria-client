import { DiffNew } from 'deep-diff';

import * as actions from '../../../actions';
import { DawwwNote, DiffInterpreter } from '../../../types';

export const interpretNoteAddedDiff: DiffInterpreter<DiffNew<DawwwNote>> = ({
  rhs,
}) => {
  return actions.noteAdded(rhs);
};
