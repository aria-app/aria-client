import getOr from 'lodash/fp/getOr';
import last from 'lodash/fp/last';
import * as actions from '../../../actions';
import * as constants from '../../../constants';

export function interpretNoteArrayEditedDiff(diff) {
  const id = getOr([], 'path[1]', diff);
  const index = getOr(-1, 'index', diff);
  const prevValue = getOr({}, 'item.lhs', diff);
  const value = getOr({}, 'item.rhs', diff);

  switch (last(getOr('', 'item.kind', diff))) {
    case constants.DIFF_KIND_D:
      return actions.notePointDeleted({ id, index, prevValue });
    case constants.DIFF_KIND_N:
      return actions.notePointAdded({ id, index, value });
    default:
      return actions.unknown();
  }
}
