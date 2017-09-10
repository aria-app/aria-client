import omit from 'lodash/fp/omit';
import { createReducer } from 'redux-create-reducer';
import shared from '../../shared';
import appData from '../../app-data';
import tracksData from '../../tracks-data';

const { setAtIds } = shared.helpers;

export const tracks = createReducer({}, {
  [appData.actions.SONG_LOADED]: (state, action) =>
    action.song.tracks,

  [tracksData.actions.TRACK_ADDED]: (state, action) =>
    setAtIds([action.track], state),

  [tracksData.actions.TRACK_DELETED]: (state, action) =>
    omit(action.track.id)(state),

  [tracksData.actions.TRACK_IS_MUTED_TOGGLED]: (state, action) =>
    shared.helpers.setAtIds([{
      ...action.track,
      isMuted: !action.track.isMuted,
      isSoloing: false,
    }], state),

  [tracksData.actions.TRACK_IS_SOLOING_TOGGLED]: (state, action) =>
    shared.helpers.setAtIds([{
      ...action.track,
      isSoloing: !action.track.isSoloing,
      isMuted: false,
    }], state),

  [tracksData.actions.TRACK_SYNTH_TYPE_SET]: (state, action) =>
    shared.helpers.setAtIds([{
      ...action.track,
      synthType: action.synthType,
    }], state),
});
