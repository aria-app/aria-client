import getOr from 'lodash/fp/getOr';

import * as actions from '../../../actions';

export function interpretNoteDeletedDiff(diff) {
  const note = getOr({}, 'lhs', diff);

  return actions.noteDeleted(note, note.id);
}
