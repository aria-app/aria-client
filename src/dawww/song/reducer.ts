import * as actions from '../actions';
import { DawwwReducer, State } from '../types';

export const songReducer: DawwwReducer<State['song']> = (state, action) => {
  switch (action.type) {
    case actions.SONG_UPDATED:
      return action.payload.song;
    default:
      return state;
  }
};
