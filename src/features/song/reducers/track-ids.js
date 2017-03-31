import { difference, map, without } from 'lodash/fp';
import * as actions from '../actions';

export const trackIds = (state = [], action) => {
  switch (action.type) {
    case actions.SONG_LOADED:
      return action.song.tracks.ids;
    case actions.TRACK_DELETED:
      return without([action.id])(state);
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
