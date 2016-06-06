import _ from 'lodash';
import { combineReducers } from 'redux';
import shared from 'ducks/shared';
import * as actionTypes from '../action-types';

const { setAtIds } = shared.helpers;

const dict = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.ADD_NOTE:
      return setAtIds([action.note], state);
    case actionTypes.ADD_NOTES:
    case actionTypes.UPDATE_NOTES:
      return setAtIds(action.notes, state);
    case actionTypes.DELETE_NOTES:
      return _.omit(state, _.map(action.notes, 'id'));
    case actionTypes.LOAD_SONG:
      return action.song.notes.dict;
    case actionTypes.SET_NOTES:
      return setAtIds(action.notes, {});
    default:
      return state;
  }
};

const ids = (state = [], action) => {
  switch (action.type) {
    case actionTypes.ADD_NOTE:
      return _.concat(state, action.note.id);
    case actionTypes.ADD_NOTES:
      return _.concat(state, _.map(action.notes, 'id'));
    case actionTypes.DELETE_NOTES:
      return _.without(state, _.map(action.notes, 'id'));
    case actionTypes.LOAD_SONG:
      return action.song.notes.ids;
    case actionTypes.SET_NOTES:
      return _.map(action.notes, 'id');
    default:
      return state;
  }
};

export default combineReducers({
  dict,
  ids,
});
