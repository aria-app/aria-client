import { concat, difference, map, omit } from 'lodash/fp';
import { combineReducers } from 'redux';
import shared from '../../shared';
import * as actions from '../actions';

const { setAtIds } = shared.helpers;

const dict = (state = {}, action) => {
  switch (action.type) {
    case actions.NOTES_ADDED:
    case actions.NOTES_UPDATED:
      return setAtIds(action.notes, state);
    case actions.NOTES_DELETED:
      return omit(action.ids)(state);
    case actions.NOTES_SET:
      return setAtIds(action.notes, state);
    case actions.SONG_LOADED:
      return action.song.notes.dict;
    default:
      return state;
  }
};

const ids = (state = [], action) => {
  switch (action.type) {
    case actions.NOTES_ADDED:
      return concat(state)(map('id')(action.notes));
    case actions.NOTES_DELETED:
      return difference(state)(action.ids);
    case actions.NOTES_SET:
      return map('id')(action.notes);
    case actions.SONG_LOADED:
      return action.song.notes.ids;
    default:
      return state;
  }
};

export default combineReducers({
  dict,
  ids,
});
