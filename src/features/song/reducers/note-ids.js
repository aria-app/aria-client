import { concat, difference, map } from 'lodash/fp';
import * as actions from '../actions';

export const noteIds = (state = [], action) => {
  switch (action.type) {
    case actions.NOTES_ADDED:
      return concat(state)(map('id')(action.notes));
    case actions.NOTES_DELETED:
      return difference(state)(map('id')(action.notes));
    case actions.NOTES_SET:
      return map('id')(action.notes);
    case actions.SONG_LOADED:
      return action.song.notes.ids;
    default:
      return state;
  }
};
