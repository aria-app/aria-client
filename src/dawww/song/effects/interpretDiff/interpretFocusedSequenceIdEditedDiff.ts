import { DiffEdit } from 'deep-diff';

import * as actions from '../../../actions';
import { DiffInterpreter } from '../../../types';

export const interpretFocusedSequenceIdEditedDiff: DiffInterpreter = (diff) => {
  const { rhs } = diff as DiffEdit<number, number>;
  return actions.focusedSequenceIdEdited(rhs);
};
