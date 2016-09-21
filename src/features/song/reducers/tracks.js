import _ from 'lodash';
import { combineReducers } from 'redux';
import shared from '../../shared';
import * as actions from '../actions';

const { setAtIds } = shared.helpers;

const dict = (state = {}, action) => {
  switch (action.type) {
    case actions.SONG_LOADED:
      return action.song.tracks.dict;
    case actions.TRACK_CREATED_AND_ADDED:
      return setAtIds([action.track], state);
    case actions.TRACK_IS_MUTED_TOGGLED:
      return shared.helpers.setAtIds([{
        ...state[action.id],
        isMuted: !state[action.id].isMuted,
        isSoloing: false,
      }], state);
    case actions.TRACK_IS_SOLOING_TOGGLED:
      return shared.helpers.setAtIds([{
        ...state[action.id],
        isSoloing: !state[action.id].isSoloing,
        isMuted: false,
      }], state);
    case actions.TRACK_SYNTH_TYPE_SET:
      return shared.helpers.setAtIds([{
        ...state[action.id],
        synthType: action.synthType,
      }], state);
    case actions.TRACKS_ADDED:
    case actions.TRACKS_UPDATED:
      return setAtIds(action.tracks, state);
    case actions.TRACKS_DELETED:
      return _.omit(state, action.ids);
    case actions.TRACKS_SET:
      return setAtIds(action.tracks);
    default:
      return state;
  }
};

const ids = (state = [], action) => {
  switch (action.type) {
    case actions.SONG_LOADED:
      return action.song.tracks.ids;
    case actions.TRACK_CREATED_AND_ADDED:
      return [
        ...state,
        action.track.id,
      ];
    case actions.TRACKS_ADDED:
      return [
        ...state,
        ..._.map(action.tracks, 'id'),
      ];
    case actions.TRACKS_DELETED:
      return _.difference(state, action.ids);
    case actions.TRACKS_SET:
      return _.map(action.tracks, 'id');
    default:
      return state;
  }
};

export default combineReducers({
  dict,
  ids,
});
