import _ from 'lodash';
import { combineReducers } from 'redux';
import shared from '../../shared';
import * as actionTypes from '../action-types';

const { setAtIds } = shared.helpers;

const dict = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.NOTES_ADDED:
    case actionTypes.NOTES_UPDATED:
      return setAtIds(action.notes, state);
    case actionTypes.NOTES_DELETED:
      return _.omit(state, action.ids);
    case actionTypes.NOTES_SET:
      return setAtIds(action.notes, state);
    case actionTypes.SONG_LOADED:
      return action.song.notes.dict;
    default:
      return state;
  }
};

const ids = (state = [], action) => {
  switch (action.type) {
    case actionTypes.NOTES_ADDED:
      return _.concat(state, _.map(action.notes, 'id'));
    case actionTypes.NOTES_DELETED:
      return _.difference(state, action.ids);
    case actionTypes.NOTES_SET:
      return _.map(action.notes, 'id');
    case actionTypes.SONG_LOADED:
      return action.song.notes.ids;
    default:
      return state;
  }
};

export default combineReducers({
  dict,
  ids,
});
