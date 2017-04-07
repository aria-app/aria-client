import { difference, map } from 'lodash/fp';
import { createReducer } from 'redux-create-reducer';
import * as actions from '../actions';

export const sequenceIds = createReducer([], {
  [actions.SEQUENCES_ADDED]: (state, action) =>
    state.concat(map('id')(action.sequences)),

  [actions.SEQUENCES_DELETED]: (state, action) =>
    difference(state)(action.ids),

  [actions.SEQUENCES_SET]: (state, action) =>
    map('id')(action.sequences),

  [actions.SONG_LOADED]: (state, action) =>
    action.song.sequences.ids,
});
