import getOr from 'lodash/fp/getOr';
import * as actions from '../../../actions';

export function interpretNoteAddedDiff(diff) {
  const note = getOr({}, 'rhs', diff);

  return actions.noteAdded(note, note.id);
}
