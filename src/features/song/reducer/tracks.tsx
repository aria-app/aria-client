import omit from 'lodash/fp/omit';
import { createSlice, PayloadAction } from 'redux-starter-kit';
import Dawww from '../../../dawww';
import shared from '../../shared';
import { Sequence, Song, Track } from '../../shared/types';
import * as actions from '../actions';

const initialState = {};

export default createSlice<{ [key: string]: Track }, {}>({
  name: 'tracks',
  initialState,
  extraReducers: {
    [actions.songLoaded.type]: (state, action: PayloadAction<Song>) =>
      action.payload.tracks,
    [actions.trackAdded.type]: (
      state,
      action: PayloadAction<{
        sequence: Sequence;
        track: Track;
      }>,
    ) => Dawww.setAtIds([action.payload.track], state),
    [actions.trackDeleted.type]: (state, action: PayloadAction<Track>) =>
      omit(action.payload.id)(state),
    [actions.trackIsMutedToggled.type]: (state, action: PayloadAction<Track>) =>
      Dawww.setAtIds(
        [
          {
            ...action.payload,
            isMuted: !action.payload.isMuted,
            isSoloing: false,
          },
        ],
        state,
      ),
    [actions.trackIsSoloingToggled.type]: (
      state,
      action: PayloadAction<Track>,
    ) =>
      Dawww.setAtIds(
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
      Dawww.setAtIds(
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
      Dawww.setAtIds(
        [
          {
            ...action.payload.track,
            volume: action.payload.volume,
          },
        ],
        state,
      ),
    [shared.actions.ROUTE_DASHBOARD_LOADED]: () => initialState,
  },
  reducers: {},
});
