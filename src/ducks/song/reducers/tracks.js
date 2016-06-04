import _ from 'lodash';
import { combineReducers } from 'redux';
import shared from 'ducks/shared';
import * as actionTypes from '../action-types';
import initialState from './initial-state';

const { setAtIds } = shared.helpers;

const dict = (state = initialState.tracks.dict, action) => {
  switch (action.type) {
    case actionTypes.ADD_TRACKS:
    case actionTypes.UPDATE_TRACKS:
      return setAtIds(action.tracks, state);
    case actionTypes.DELETE_TRACKS:
      return _.omit(state, _.map(action.tracks, 'id'));
    case actionTypes.SET_TRACKS:
      return setAtIds(action.tracks, {});
    default:
      return state;
  }
};

const ids = (state = initialState.tracks.ids, action) => {
  switch (action.type) {
    case actionTypes.ADD_TRACKS:
      return [
        ...state,
        ..._.map(action.tracks, 'id'),
      ];
    case actionTypes.DELETE_TRACKS:
      return _.without(state, _.map(action.tracks, 'id'));
    case actionTypes.SET_TRACKS:
      return _.map(action.tracks, 'id');
    default:
      return state;
  }
};

export default combineReducers({
  dict,
  ids,
});
