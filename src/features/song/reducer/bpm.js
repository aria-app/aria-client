import { createReducer } from 'redux-create-reducer';
import shared from '../../shared';

export const bpm = createReducer(120, {
  [shared.actions.BPM_SET]: (state, action) =>
    action.payload.bpm,

  [shared.actions.SONG_LOADED]: (state, action) =>
    action.payload.song.bpm,
});
