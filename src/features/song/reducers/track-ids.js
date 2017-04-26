import without from 'lodash/fp/without';
import { createReducer } from 'redux-create-reducer';
import appData from '../../app-data';
import tracksData from '../../tracks-data';

export const trackIds = createReducer([], {
  [appData.actions.SONG_LOADED]: (state, action) =>
    action.payload.tracks.ids,

  [tracksData.actions.TRACK_ADDED]: (state, action) =>
    state.concat([action.trackId]),

  [tracksData.actions.TRACK_DELETED]: (state, action) =>
    without([action.id])(state),
});
