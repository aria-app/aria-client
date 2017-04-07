import { createReducer } from 'redux-create-reducer';
import * as actions from '../actions';

export const name = createReducer('', {
  [actions.NAME_SET]: (state, action) =>
    action.name,

  [actions.SONG_LOADED]: (state, action) =>
    action.song.name,
});
