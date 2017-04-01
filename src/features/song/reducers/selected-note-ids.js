import { includes, map, without } from 'lodash/fp';
import shortcuts from '../../shortcuts';
import * as actions from '../actions';

export const selectedNoteIds = (state = [], action) => {
  switch (action.type) {
    case actions.ALL_NOTES_DESELECTED:
    case shortcuts.actions.DESELECT:
    case actions.NOTES_DELETED:
    case actions.SEQUENCE_CLOSED:
      return [];
    case actions.NOTE_SELECTED:
      if (action.isAdditive) {
        return includes(action.note.id)(state)
          ? without([action.note.id])(state)
          : [...state, action.note.id];
      }
      return !includes(action.note.id)(state)
        ? [action.note.id]
        : state;
    case actions.NOTES_SELECTED:
      return map('id')(action.notes);
    default:
      return state;
  }
};
