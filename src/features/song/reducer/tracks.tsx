import omit from 'lodash/fp/omit';
import { createSlice } from 'redux-starter-kit';
import Dawww from '../../../dawww';
import shared from '../../shared';

const initialState = {};

export default createSlice({
  name: 'tracks',
  initialState,
  extraReducers: {
    [shared.actions.DASHBOARD_LOADED]: () => initialState,
    [shared.actions.SONG_LOADED]: (state, action) => action.payload.song.tracks,
    [shared.actions.TRACK_ADDED]: (state, action) =>
      Dawww.setAtIds([action.payload.track], state),
    [shared.actions.TRACK_DELETED]: (state, action) =>
      omit(action.payload.track.id)(state),
    [shared.actions.TRACK_IS_MUTED_TOGGLED]: (state, action) =>
      Dawww.setAtIds(
        [
          {
            ...action.payload.track,
            isMuted: !action.payload.track.isMuted,
            isSoloing: false,
          },
        ],
        state,
      ),
    [shared.actions.TRACK_IS_SOLOING_TOGGLED]: (state, action) =>
      Dawww.setAtIds(
        [
          {
            ...action.payload.track,
            isSoloing: !action.payload.track.isSoloing,
            isMuted: false,
          },
        ],
        state,
      ),
    [shared.actions.TRACK_VOICE_SET]: (state, action) =>
      Dawww.setAtIds(
        [
          {
            ...action.payload.track,
            voice: action.payload.voice,
          },
        ],
        state,
      ),
    [shared.actions.TRACK_VOLUME_SET]: (state, action) =>
      Dawww.setAtIds(
        [
          {
            ...action.payload.track,
            volume: action.payload.volume,
          },
        ],
        state,
      ),
  },
  reducers: {},
});
