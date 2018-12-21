import { createReducer } from 'redux-create-reducer';
import shared from '../../shared';

const initialValue = '';

export const id = createReducer(initialValue, {
  [shared.actions.DASHBOARD_LOADED]: (state, action) =>
    initialValue,

  [shared.actions.SONG_LOADED]: (state, action) =>
    action.payload.song.id,
});
