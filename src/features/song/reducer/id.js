import { createReducer } from 'redux-create-reducer';
import appData from '../../app-data';

export const id = createReducer('', {
  [appData.actions.SONG_LOADED]: (state, action) =>
    action.song.id,
});
