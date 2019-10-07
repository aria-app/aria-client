import getOr from 'lodash/fp/getOr';
import last from 'lodash/fp/last';
import * as actions from '../../../actions';

export function interpretNoteEditedDiff(diff) {
  const id = getOr([], 'path[1]', diff);
  const index = getOr(-1, 'path[3]', diff);
  const property = last(getOr([], 'path', diff));
  const prevValue = getOr('', 'lhs', diff);
  const value = getOr('', 'rhs', diff);

  switch (property) {
    case 'sequenceId':
      return actions.noteSequenceIdEdited({ id, prevValue, value });
    case 'x':
      return actions.notePointXEdited({ id, index, prevValue, value });
    case 'y':
      return actions.notePointYEdited({ id, index, prevValue, value });
    default:
      return actions.unknown();
  }
}
