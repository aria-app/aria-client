import { createReducer } from 'redux-create-reducer';
import appData from '../../app-data';
import * as actions from '../actions';

export const id = createReducer('', {
  [actions.ID_SET]: (state, action) =>
    action.id,

  [appData.actions.SONG_LOADED]: (state, action) =>
    action.payload.id,
});
