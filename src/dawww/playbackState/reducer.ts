import * as actions from '../actions';
import { DawwwReducer, State } from '../types';

export const playbackStateReducer: DawwwReducer<State['playbackState']> = (
  state,
  action,
) => {
  switch (action.type) {
    case actions.PLAYBACK_STATE_SET:
      return action.payload.playbackState;
    default:
      return state;
  }
};
