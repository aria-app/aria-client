import { createSlice } from 'redux-starter-kit';
import Dawww from '../../../dawww';
import shared from '../../shared';

export default createSlice({
  name: 'playbackState',
  initialState: Dawww.PLAYBACK_STATES.STOPPED,
  extraReducers: {
    [shared.actions.PLAYBACK_STATE_REQUEST_SUCCEEDED]: (state, action) =>
      action.payload.playbackState,
  },
  reducers: {},
});
