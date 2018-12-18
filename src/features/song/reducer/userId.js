import { createReducer } from 'redux-create-reducer';
import shared from '../../shared';

export const userId = createReducer('', {
  [shared.actions.SONG_LOADED]: (state, action) =>
    action.payload.song.userId,
});
