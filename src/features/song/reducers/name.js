import { createReducer } from 'redux-create-reducer';
import appData from '../../app-data';
import * as actions from '../actions';

export const name = createReducer('', {
  [actions.NAME_SET]: (state, action) =>
    action.name,

  [appData.actions.SONG_LOADED]: (state, action) =>
    action.payload.name,
});
