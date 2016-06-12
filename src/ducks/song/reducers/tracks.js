import _ from 'lodash';
import { combineReducers } from 'redux';
import shared from 'ducks/shared';
import * as actionTypes from '../action-types';

const { setAtIds } = shared.helpers;

const dict = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.ADD_TRACK:
    case actionTypes.ADD_NEW_TRACK:
      return setAtIds([action.track], state);
    case actionTypes.ADD_TRACKS:
    case actionTypes.UPDATE_TRACKS:
      return setAtIds(action.tracks, state);
    case actionTypes.LOAD_SONG:
      return action.song.tracks.dict;
    case actionTypes.DELETE_TRACK_BY_ID:
      return _.reject(state, { id: action.id });
    case actionTypes.DELETE_TRACKS:
      return _.omit(state, _.map(action.tracks, 'id'));
    case actionTypes.SET_TRACKS:
      return setAtIds(action.tracks, {});
    case actionTypes.TOGGLE_TRACK_IS_MUTED:
      return shared.helpers.setAtIds([{
        ...state[action.id],
        isMuted: !state[action.id].isMuted,
        isSoloing: false,
      }], state);
    case actionTypes.TOGGLE_TRACK_IS_SOLOING:
      return shared.helpers.setAtIds([{
        ...state[action.id],
        isSoloing: !state[action.id].isSoloing,
        isMuted: false,
      }], state);
    case actionTypes.UPDATE_TRACK:
      return {
        ...state,
        [action.track.id]: action.track,
      };
    default:
      return state;
  }
};

const ids = (state = [], action) => {
  switch (action.type) {
    case actionTypes.ADD_NEW_TRACK:
      return [
        ...state,
        action.track.id,
      ];
    case actionTypes.ADD_TRACKS:
      return [
        ...state,
        ..._.map(action.tracks, 'id'),
      ];
    case actionTypes.DELETE_TRACKS:
      return _.without(state, _.map(action.tracks, 'id'));
    case actionTypes.LOAD_SONG:
      return action.song.tracks.ids;
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
