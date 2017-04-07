import { createReducer } from 'redux-create-reducer';
import * as actions from '../actions';

export const id = createReducer('', {
  [actions.ID_SET]: (state, action) =>
    action.id,

  [actions.SONG_LOADED]: (state, action) =>
    action.song.id,
});
