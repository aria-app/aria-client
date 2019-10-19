import { createSlice } from 'redux-starter-kit';
import shared from '../../shared';

const initialState = 120;

export default createSlice({
  name: 'bpm',
  initialState,
  extraReducers: {
    [shared.actions.BPM_SET]: (state, action) => action.payload.bpm,
    [shared.actions.DASHBOARD_LOADED]: () => initialState,
    [shared.actions.SONG_LOADED]: (state, action) => action.payload.song.bpm,
  },
  reducers: {},
});
