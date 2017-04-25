import difference from 'lodash/fp/difference';
import map from 'lodash/fp/map';
import without from 'lodash/fp/without';
import { createReducer } from 'redux-create-reducer';
import tracksData from '../../tracks-data';
import * as actions from '../actions';

export const trackIds = createReducer([], {
  [actions.SONG_LOADED]: (state, action) =>
    action.song.tracks.ids,

  [actions.TRACK_DELETED]: (state, action) =>
    without([action.id])(state),

  [actions.TRACKS_ADDED]: (state, action) => [
    ...state,
    ...map('id')(action.tracks),
  ],

  [actions.TRACKS_DELETED]: (state, action) =>
    difference(state)(action.ids),

  [actions.TRACKS_SET]: (state, action) =>
    map('id')(action.tracks),

  [tracksData.actions.TRACK_DELETED]: (state, action) =>
    without(action.payload.track.id)(state),
});
