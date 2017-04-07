import { createReducer } from 'redux-create-reducer';
import * as actions from '../actions';

export const measureCount = createReducer(1, {
  [actions.MEASURE_COUNT_SET]: (state, action) =>
    action.measureCount,

  [actions.SONG_EXTENDED]: state =>
    state + 1,

  [actions.SONG_LOADED]: (state, action) =>
    action.song.measureCount,

  [actions.SONG_SHORTENED]: state =>
    (state > 1 ? state - 1 : state),
});
