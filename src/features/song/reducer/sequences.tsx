import omit from 'lodash/fp/omit';
import reject from 'lodash/fp/reject';
import { createSlice } from 'redux-starter-kit';
import Dawww from '../../../dawww';
import shared from '../../shared';
import * as actions from '../actions';

const initialState = {};

export default createSlice({
  name: 'sequences',
  initialState,
  extraReducers: {
    [actions.SONG_LOADED]: (state, action) => action.payload.song.sequences,
    [actions.SEQUENCE_ADDED]: (state, action) =>
      Dawww.setAtIds([action.payload.sequence], state),
    [actions.SEQUENCE_DELETED]: (state, action) =>
      omit(action.payload.sequence.id, state),
    [actions.SEQUENCE_DUPLICATED]: (state, action) =>
      Dawww.setAtIds([action.payload.duplicatedSequence], state),
    [actions.SEQUENCE_EDITED]: (state, action) =>
      Dawww.setAtIds([action.payload.sequence], state),
    [actions.TRACK_ADDED]: (state, action) =>
      Dawww.setAtIds([action.payload.sequence], state),
    [actions.TRACK_DELETED]: (state, action) =>
      Dawww.setAtIds(
        reject(sequence => sequence.trackId === action.payload.track.id, state),
        {},
      ),
    [shared.actions.ROUTE_DASHBOARD_LOADED]: () => initialState,
  },
  reducers: {},
});
