import { createReducer } from 'redux-starter-kit';
import shared from '../../shared';

const initialValue = 120;

export const bpm = createReducer(initialValue, {
  [shared.actions.BPM_SET]: (state, action) => action.payload.bpm,

  [shared.actions.DASHBOARD_LOADED]: (state, action) => initialValue,

  [shared.actions.SONG_LOADED]: (state, action) => action.payload.song.bpm,
});
