import { difference, map, omit, without } from 'lodash/fp';
import { combineReducers } from 'redux';
import shared from '../../shared';
import * as actions from '../actions';

const { setAtIds } = shared.helpers;

const dict = (state = {}, action) => {
  switch (action.type) {
    case actions.SONG_LOADED:
      return action.song.tracks.dict;
    case actions.TRACK_DELETED:
      return omit(action.id)(state);
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
      return omit(action.ids)(state);
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
    case actions.TRACK_DELETED:
      return without(action.id)(state);
    case actions.TRACKS_ADDED:
      return [
        ...state,
        ...map('id')(action.tracks),
      ];
    case actions.TRACKS_DELETED:
      return difference(state)(action.ids);
    case actions.TRACKS_SET:
      return map('id')(action.tracks);
    default:
      return state;
  }
};

export default combineReducers({
  dict,
  ids,
});
