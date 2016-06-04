import _ from 'lodash';
import { combineReducers } from 'redux';
import * as actionTypes from '../action-types';
import initialState from './initial-state';

const dict = (state = initialState.sequences.dict, action) => {
  switch (action.type) {
    case actionTypes.SET_SEQUENCES:
      return action.sequences
        .reduce((acc, cur) => ({
          ...acc,
          [cur.id]: cur,
        }), {});
    default:
      return state;
  }
};

const ids = (state = initialState.sequences.ids, action) => {
  switch (action.type) {
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
