import { map, omit } from 'lodash/fp';
import shared from '../../shared';
import * as actions from '../actions';

const { setAtIds } = shared.helpers;

export const noteDict = (state = {}, action) => {
  switch (action.type) {
    case actions.NOTES_ADDED:
    case actions.NOTES_MOVE_COMMITTED:
    case actions.NOTES_RESIZE_COMMITTED:
      return setAtIds(action.notes, state);
    case actions.NOTES_DELETE_COMMITTED:
      return omit(map('id')(action.ids))(state);
    case actions.NOTES_SET:
      return setAtIds(action.notes, state);
    case actions.SONG_LOADED:
      return action.song.notes.dict;
    default:
      return state;
  }
};
