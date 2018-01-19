import { createReducer } from 'redux-create-reducer';
import shared from '../../shared';

export const name = createReducer('', {
  [shared.actions.SONG_LOADED]: (state, action) =>
    action.song.name,
});
