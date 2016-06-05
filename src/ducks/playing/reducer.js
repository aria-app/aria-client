import _ from 'lodash';
import { combineReducers } from 'redux';
import shared from 'ducks/shared';
import * as actionTypes from './action-types';

const byId = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.SET_TRACKS:
      return shared.helpers.setAtIds(action.tracks, {});
    case actionTypes.UPDATE_TRACK:
      return shared.helpers.setAtIds([action.track], state);
    default:
      return state;
  }
};

const ids = (state = [], action) => {
  switch (action.type) {
    case actionTypes.SET_TRACKS:
      return _.map(action.tracks, 'id');
    default:
      return state;
  }
};

const tracks = combineReducers({
  byId,
  ids,
});

export default combineReducers({
  tracks,
});
