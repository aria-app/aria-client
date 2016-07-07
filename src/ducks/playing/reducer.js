import _ from 'lodash';
import { combineReducers } from 'redux';
import shared from 'ducks/shared';
import * as actionTypes from './action-types';

const byId = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.CHANNEL_ADDED:
    case actionTypes.CHANNEL_UPDATED:
      return shared.helpers.setAtIds([action.channel], state);
    case actionTypes.CHANNELS_SET:
      return shared.helpers.setAtIds(action.channels, {});
    default:
      return state;
  }
};

const ids = (state = [], action) => {
  switch (action.type) {
    case actionTypes.CHANNEL_ADDED:
      return state.concat(action.channel.id);
    case actionTypes.CHANNELS_SET:
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
