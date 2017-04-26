import { createReducer } from 'redux-create-reducer';
import appData from '../../app-data';
import * as actions from '../actions';

export const measureCount = createReducer(1, {
  [actions.MEASURE_COUNT_SET]: (state, action) =>
    action.measureCount,

  [actions.SONG_EXTENDED]: state =>
    state + 1,

  [actions.SONG_SHORTENED]: state =>
    (state > 1 ? state - 1 : state),

  [appData.actions.SONG_LOADED]: (state, action) =>
    action.payload.measureCount,
});
