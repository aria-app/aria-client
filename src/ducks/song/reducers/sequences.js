import _ from 'lodash';
import { combineReducers } from 'redux';
import shared from 'ducks/shared';
import * as actionTypes from '../action-types';

const { setAtIds } = shared.helpers;

const dict = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.ADD_SEQUENCE:
      return setAtIds([action.sequence], state);
    case actionTypes.ADD_SEQUENCES:
    case actionTypes.UPDATE_SEQUENCES:
      return setAtIds(action.sequences, state);
    case actionTypes.DELETE_SEQUENCES:
      return _.omit(state, _.map(action.sequences, 'id'));
    case actionTypes.LOAD_SONG:
      return action.song.sequences.dict;
    case actionTypes.SET_SEQUENCES:
      return setAtIds(action.sequences, state);
    default:
      return state;
  }
};

const ids = (state = [], action) => {
  switch (action.type) {
    case actionTypes.ADD_SEQUENCE:
      return [
        ...state,
        action.sequence.id,
      ];
    case actionTypes.ADD_SEQUENCES:
      return [
        ...state,
        ..._.map(action.sequences, 'id'),
      ];
    case actionTypes.DELETE_SEQUENCES:
      return _.without(state, _.map(action.sequences, 'id'));
    case actionTypes.LOAD_SONG:
      return action.song.sequences.ids;
    case actionTypes.SET_SEQUENCES:
      return _.map(action.sequences, 'id');
    default:
      return state;
  }
};

export default combineReducers({
  dict,
  ids,
});
