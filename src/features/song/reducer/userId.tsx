import { createReducer } from 'redux-starter-kit';
import shared from '../../shared';

const initialValue = '';

export const userId = createReducer(initialValue, {
  [shared.actions.DASHBOARD_LOADED]: (state, action) => initialValue,

  [shared.actions.SONG_LOADED]: (state, action) => action.payload.song.userId,
});
