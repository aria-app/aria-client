import { difference, map } from 'lodash/fp';
import * as actions from '../actions';

export const sequenceIds = (state = [], action) => {
  switch (action.type) {
    case actions.SEQUENCES_ADDED:
      return state.concat(map('id')(action.sequences));
    case actions.SEQUENCES_DELETED:
      return difference(state)(action.ids);
    case actions.SEQUENCES_SET:
      return map('id')(action.sequences);
    case actions.SONG_LOADED:
      return action.song.sequences.ids;
    default:
      return state;
  }
};
