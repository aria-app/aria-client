import omit from 'lodash/fp/omit';
import reject from 'lodash/fp/reject';
import { createSlice } from 'redux-starter-kit';
import Dawww from '../../../dawww';
import shared from '../../shared';

const initialState = {};

export default createSlice({
  name: 'sequences',
  initialState,
  extraReducers: {
    [shared.actions.DASHBOARD_LOADED]: () => initialState,
    [shared.actions.SONG_LOADED]: (state, action) =>
      action.payload.song.sequences,
    [shared.actions.SEQUENCE_ADDED]: (state, action) =>
      Dawww.setAtIds([action.payload.sequence], state),
    [shared.actions.SEQUENCE_DELETED]: (state, action) =>
      omit(action.payload.sequence.id, state),
    [shared.actions.SEQUENCE_DUPLICATED]: (state, action) =>
      Dawww.setAtIds([action.payload.duplicatedSequence], state),
    [shared.actions.SEQUENCE_EDITED]: (state, action) =>
      Dawww.setAtIds([action.payload.sequence], state),
    [shared.actions.TRACK_ADDED]: (state, action) =>
      Dawww.setAtIds([action.payload.sequence], state),
    [shared.actions.TRACK_DELETED]: (state, action) =>
      Dawww.setAtIds(
        reject(sequence => sequence.trackId === action.payload.track.id, state),
        {},
      ),
  },
  reducers: {},
});
