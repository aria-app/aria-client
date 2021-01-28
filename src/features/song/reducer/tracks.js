import { createReducer } from '@reduxjs/toolkit';
import omit from 'lodash/fp/omit';

import shared from '../../shared';
import * as actions from '../actions';

const initialState = {};

export default createReducer(initialState, {
  [actions.songLoaded.type]: (state, action) => action.payload.tracks,
  [actions.trackAdded.type]: (state, action) =>
    shared.helpers.setAtIds([action.payload.track], state),
  [actions.trackDeleted.type]: (state, action) =>
    omit(action.payload.id)(state),
  [actions.trackIsMutedToggled.type]: (state, action) =>
    shared.helpers.setAtIds(
      [
        {
          ...action.payload,
          isMuted: !action.payload.isMuted,
          isSoloing: false,
        },
      ],
      state,
    ),
  [actions.trackIsSoloingToggled.type]: (state, action) =>
    shared.helpers.setAtIds(
      [
        {
          ...action.payload,
          isSoloing: !action.payload.isSoloing,
          isMuted: false,
        },
      ],
      state,
    ),
  [actions.trackVoiceSet.type]: (state, action) =>
    shared.helpers.setAtIds(
      [
        {
          ...action.payload.track,
          voice: action.payload.voice,
        },
      ],
      state,
    ),
  [actions.trackVolumeSet.type]: (state, action) =>
    shared.helpers.setAtIds(
      [
        {
          ...action.payload.track,
          volume: action.payload.volume,
        },
      ],
      state,
    ),
});
