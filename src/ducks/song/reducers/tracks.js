import _ from 'lodash';
import { combineReducers } from 'redux';
import shared from '../../shared';
import * as actionTypes from '../action-types';

const { setAtIds } = shared.helpers;

const dict = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.SONG_LOADED:
      return action.song.tracks.dict;
    case actionTypes.TRACK_CREATED_AND_ADDED:
      return setAtIds([action.track], state);
    case actionTypes.TRACK_IS_MUTED_TOGGLED:
      return shared.helpers.setAtIds([{
        ...state[action.id],
        isMuted: !state[action.id].isMuted,
        isSoloing: false,
      }], state);
    case actionTypes.TRACK_IS_SOLOING_TOGGLED:
      return shared.helpers.setAtIds([{
        ...state[action.id],
        isSoloing: !state[action.id].isSoloing,
        isMuted: false,
      }], state);
    case actionTypes.TRACK_SYNTH_TYPE_SET:
      return shared.helpers.setAtIds([{
        ...state[action.id],
        synthType: action.synthType,
      }], state);
    case actionTypes.TRACKS_ADDED:
    case actionTypes.TRACKS_UPDATED:
      return setAtIds(action.tracks, state);
    case actionTypes.TRACKS_DELETED:
      return _.omit(state, action.ids);
    case actionTypes.TRACKS_SET:
      return setAtIds(action.tracks);
    default:
      return state;
  }
};

const ids = (state = [], action) => {
  switch (action.type) {
    case actionTypes.SONG_LOADED:
      return action.song.tracks.ids;
    case actionTypes.TRACK_CREATED_AND_ADDED:
      return [
        ...state,
        action.track.id,
      ];
    case actionTypes.TRACKS_ADDED:
      return [
        ...state,
        ..._.map(action.tracks, 'id'),
      ];
    case actionTypes.TRACKS_DELETED:
      return _.difference(state, action.ids);
    case actionTypes.TRACKS_SET:
      return _.map(action.tracks, 'id');
    default:
      return state;
  }
};

export default combineReducers({
  dict,
  ids,
});
