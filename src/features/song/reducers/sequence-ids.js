import { difference, map } from 'lodash/fp';
import { createReducer } from 'redux-create-reducer';
import appData from '../../app-data';
import * as actions from '../actions';

export const sequenceIds = createReducer([], {
  [actions.SEQUENCES_ADDED]: (state, action) =>
    state.concat(map('id')(action.sequences)),

  [actions.SEQUENCES_DELETED]: (state, action) =>
    difference(state)(action.ids),

  [actions.SEQUENCES_SET]: (state, action) =>
    map('id')(action.sequences),

  [appData.actions.SONG_LOADED]: (state, action) =>
    action.payload.sequences.ids,
});
