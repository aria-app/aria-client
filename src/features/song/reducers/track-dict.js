import omit from 'lodash/fp/omit';
import { createReducer } from 'redux-create-reducer';
import shared from '../../shared';
import appData from '../../app-data';
import tracksData from '../../tracks-data';
import * as helpers from '../helpers';

const { setAtIds } = shared.helpers;

export const trackDict = createReducer({}, {
  [appData.actions.SONG_LOADED]: (state, action) =>
    action.payload.tracks.dict,

  [tracksData.actions.TRACK_ADDED]: (state, action) =>
    setAtIds([helpers.createTrack({
      id: action.trackId,
    })], state),

  [tracksData.actions.TRACK_DELETED]: (state, action) =>
    omit(action.id)(state),

  [tracksData.actions.TRACK_IS_MUTED_TOGGLED]: (state, action) =>
    shared.helpers.setAtIds([{
      ...state[action.id],
      isMuted: !state[action.id].isMuted,
      isSoloing: false,
    }], state),

  [tracksData.actions.TRACK_IS_SOLOING_TOGGLED]: (state, action) =>
    shared.helpers.setAtIds([{
      ...state[action.id],
      isSoloing: !state[action.id].isSoloing,
      isMuted: false,
    }], state),

  [tracksData.actions.TRACK_SYNTH_TYPE_SET]: (state, action) =>
    shared.helpers.setAtIds([{
      ...state[action.payload.track.id],
      synthType: action.payload.synthType,
    }], state),
});
