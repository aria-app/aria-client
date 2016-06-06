import _ from 'lodash';
import { combineReducers } from 'redux';
import shared from 'ducks/shared';
import * as actionTypes from './action-types';

const byId = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.ADD_CHANNEL:
    case actionTypes.UPDATE_CHANNEL:
      return shared.helpers.setAtIds([action.channel], state);
    case actionTypes.SET_CHANNELS:
      return shared.helpers.setAtIds(action.channels, {});
    case actionTypes.UPDATE_CHANNELS:
      return shared.helpers.setAtIds(action.channels, state);
    default:
      return state;
  }
};

const ids = (state = [], action) => {
  switch (action.type) {
    case actionTypes.ADD_CHANNEL:
      return [
        ...state,
        action.channel.id,
      ];
    case actionTypes.SET_CHANNELS:
      return _.map(action.channels, 'id');
    default:
      return state;
  }
};

const channels = combineReducers({
  byId,
  ids,
});

export default combineReducers({
  channels,
});
