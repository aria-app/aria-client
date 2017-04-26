import omit from 'lodash/fp/omit';
import { createReducer } from 'redux-create-reducer';
import shared from '../../shared';
import appData from '../../app-data';
import tracksData from '../../tracks-data';
import * as actions from '../actions';
import * as helpers from '../helpers';

const { setAtIds } = shared.helpers;

export const trackDict = createReducer({}, {
  [actions.TRACK_DELETED]: (state, action) =>
    omit(action.id)(state),

  [actions.TRACK_IS_MUTED_TOGGLED]: (state, action) =>
    shared.helpers.setAtIds([{
      ...state[action.id],
      isMuted: !state[action.id].isMuted,
      isSoloing: false,
    }], state),

  [actions.TRACK_IS_SOLOING_TOGGLED]: (state, action) =>
    shared.helpers.setAtIds([{
      ...state[action.id],
      isSoloing: !state[action.id].isSoloing,
      isMuted: false,
    }], state),

  [actions.TRACK_SYNTH_TYPE_SET]: (state, action) =>
    shared.helpers.setAtIds([{
      ...state[action.payload.track.id],
      synthType: action.payload.synthType,
    }], state),

  [actions.TRACKS_ADDED]: (state, action) =>
    setAtIds(action.tracks, state),

  [actions.TRACKS_DELETED]: (state, action) =>
    omit(action.ids)(state),

  [actions.TRACKS_SET]: (state, action) =>
    setAtIds(action.tracks),

  [actions.TRACKS_UPDATED]: (state, action) =>
    setAtIds(action.tracks, state),

  [appData.actions.SONG_LOADED]: (state, action) =>
    action.payload.tracks.dict,

  [tracksData.actions.TRACK_ADDED]: (state, action) =>
    setAtIds([helpers.createTrack({
      id: action.trackId,
    })], state),

  [tracksData.actions.TRACK_DELETED]: (state, action) =>
    omit(action.payload.track.id)(state),
});