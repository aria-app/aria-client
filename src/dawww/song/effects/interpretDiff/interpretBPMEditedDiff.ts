import { DiffEdit } from 'deep-diff';

import * as actions from '../../../actions';
import { DiffInterpreter } from '../../../types';

export const interpretBPMEditedDiff: DiffInterpreter = (diff) => {
  const { rhs } = diff as DiffEdit<number, number>;
  return actions.bpmEdited(rhs);
};
