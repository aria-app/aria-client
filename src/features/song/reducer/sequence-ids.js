import map from 'lodash/fp/map';
import without from 'lodash/fp/without';
import { createReducer } from 'redux-create-reducer';
import appData from '../../app-data';
import tracksData from '../../tracks-data';

export const sequenceIds = createReducer([], {
  [appData.actions.SONG_LOADED]: (state, action) =>
    action.song.sequences.ids,

  [tracksData.actions.SEQUENCE_ADDED]: (state, action) =>
    [...state, action.sequence.id],

  [tracksData.actions.TRACK_ADDED]: (state, action) =>
    [...state, action.sequence.id],

  [tracksData.actions.TRACK_DELETED]: (state, action) =>
    without(map('id', action.sequences), state),
});
