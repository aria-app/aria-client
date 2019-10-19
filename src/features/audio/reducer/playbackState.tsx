import { createSlice, PayloadAction } from 'redux-starter-kit';
import Dawww from '../../../dawww';
import * as actions from '../actions';

export default createSlice<string, {}>({
  name: 'playbackState',
  initialState: Dawww.PLAYBACK_STATES.STOPPED,
  extraReducers: {
    [actions.playbackStateRequestSucceeded.type]: (
      state,
      action: PayloadAction<string>,
    ) => action.payload,
  },
  reducers: {},
});
