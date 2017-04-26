import { createReducer } from 'redux-create-reducer';
import appData from '../../app-data';
import tracksData from '../../tracks-data';

export const measureCount = createReducer(1, {
  [appData.actions.SONG_LOADED]: (state, action) =>
    action.payload.measureCount,

  [tracksData.actions.SONG_EXTENDED]: state =>
    state + 1,

  [tracksData.actions.SONG_SHORTENED]: state =>
    state - 1,
});
