import { omit } from 'lodash/fp';
import { createReducer } from 'redux-create-reducer';
import shared from '../../shared';
import * as actions from '../actions';

const { setAtIds } = shared.helpers;

export const trackDict = createReducer({}, {
  [actions.SONG_LOADED]: (state, action) =>
    action.song.tracks.dict,

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
      ...state[action.id],
      synthType: action.synthType,
    }], state),

  [actions.TRACKS_ADDED]: (state, action) =>
    setAtIds(action.tracks, state),

  [actions.TRACKS_DELETED]: (state, action) =>
    omit(action.ids)(state),

  [actions.TRACKS_SET]: (state, action) =>
    setAtIds(action.tracks),

  [actions.TRACKS_UPDATED]: (state, action) =>
    setAtIds(action.tracks, state),
});
