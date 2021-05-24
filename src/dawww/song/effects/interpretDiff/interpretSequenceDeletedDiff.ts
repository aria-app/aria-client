import { DiffDeleted } from 'deep-diff';

import * as actions from '../../../actions';
import { DawwwSequence, DiffInterpreter } from '../../../types';

export const interpretSequenceDeletedDiff: DiffInterpreter<
  DiffDeleted<DawwwSequence>
> = ({ lhs }) => {
  return actions.sequenceDeletionRequested(lhs);
};
