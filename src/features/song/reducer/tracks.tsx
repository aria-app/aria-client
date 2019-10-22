import omit from 'lodash/fp/omit';
import { createReducer, PayloadAction } from 'redux-starter-kit';
import { Sequence, Song, Track } from '../../../types';
import shared from '../../shared';
import * as actions from '../actions';

const initialState = {};

export default createReducer<{ [key: string]: Track }, {}>(initialState, {
  [actions.songLoaded.type]: (state, action: PayloadAction<Song>) =>
    action.payload.tracks,
  [actions.trackAdded.type]: (
    state,
    action: PayloadAction<{
      sequence: Sequence;
      track: Track;
    }>,
  ) => shared.helpers.setAtIds([action.payload.track], state),
  [actions.trackDeleted.type]: (state, action: PayloadAction<Track>) =>
    omit(action.payload.id)(state),
  [actions.trackIsMutedToggled.type]: (state, action: PayloadAction<Track>) =>
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
  [actions.trackIsSoloingToggled.type]: (state, action: PayloadAction<Track>) =>
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
  [actions.trackVoiceSet.type]: (
    state,
    action: PayloadAction<{ track: Track; voice: string }>,
  ) =>
    shared.helpers.setAtIds(
      [
        {
          ...action.payload.track,
          voice: action.payload.voice,
        },
      ],
      state,
    ),
  [actions.trackVolumeSet.type]: (
    state,
    action: PayloadAction<{ track: Track; volume: string }>,
  ) =>
    shared.helpers.setAtIds(
      [
        {
          ...action.payload.track,
          volume: action.payload.volume,
        },
      ],
      state,
    ),
  [shared.actions.routeDashboardLoaded.type]: () => initialState,
});
