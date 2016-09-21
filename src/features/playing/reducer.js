import _ from 'lodash';
import { combineReducers } from 'redux';
import shared from '../shared';
import * as actions from './actions';

const byId = (state = {}, action) => {
  switch (action.type) {
    case actions.CHANNEL_ADDED:
      return shared.helpers.setAtIds([action.channel], state);
    case actions.CHANNELS_SET:
      return shared.helpers.setAtIds(action.channels, {});
    default:
      return state;
  }
};

const ids = (state = [], action) => {
  switch (action.type) {
    case actions.CHANNEL_ADDED:
      return state.concat(action.channel.id);
    case actions.CHANNELS_SET:
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
