import { DiffNew } from 'deep-diff';

import * as actions from '../../../actions';
import { DawwwSequence, DiffInterpreter } from '../../../types';

export const interpretSequenceAddedDiff: DiffInterpreter<
  DiffNew<DawwwSequence>
> = ({ rhs }) => {
  return actions.sequenceAdded(rhs);
};
