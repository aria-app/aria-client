import _ from 'lodash';
import { combineReducers } from 'redux';
import shared from 'ducks/shared';
import * as actionTypes from './action-types';

const byId = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.ADD_CHANNEL:
    case actionTypes.UPDATE_CHANNEL:
      console.log('U1 Len', action.channel.synths.length);
      return shared.helpers.setAtIds([action.channel], state);
    case actionTypes.SET_CHANNELS:
      return shared.helpers.setAtIds(action.channels, {});
    case actionTypes.UPDATE_CHANNELS:
      action.channels.forEach(c => console.log('U2 Len', c.synths.length));
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
