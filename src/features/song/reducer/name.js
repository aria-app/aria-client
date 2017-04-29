import { createReducer } from 'redux-create-reducer';
import appData from '../../app-data';

export const name = createReducer('', {
  [appData.actions.SONG_LOADED]: (state, action) =>
    action.song.name,
});
