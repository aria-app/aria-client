import _ from 'lodash';
import { combineReducers } from 'redux';
import * as actionTypes from '../action-types';
import initialState from './initial-state';

const dict = (state = initialState.tracks.dict, action) => {
  switch (action.type) {
    case actionTypes.SET_TRACKS:
      return action.tracks
        .reduce((acc, cur) => ({
          ...acc,
          [cur.id]: cur,
        }), {});
    default:
      return state;
  }
};

const ids = (state = initialState.tracks.ids, action) => {
  switch (action.type) {
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
