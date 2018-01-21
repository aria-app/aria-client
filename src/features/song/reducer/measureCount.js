import { createReducer } from 'redux-create-reducer';
import shared from '../../shared';

export const measureCount = createReducer(1, {
  [shared.actions.SONG_LOADED]: (state, action) =>
    action.payload.song.measureCount,

  [shared.actions.SONG_EXTENDED]: state =>
    state + 1,

  [shared.actions.SONG_SHORTENED]: state =>
    state - 1,
});
