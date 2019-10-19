import { createSlice } from 'redux-starter-kit';
import shared from '../../shared';
import * as actions from '../actions';

const initialState = 120;

export default createSlice({
  name: 'bpm',
  initialState,
  extraReducers: {
    [actions.BPM_SET]: (state, action) => action.payload.bpm,
    [actions.SONG_LOADED]: (state, action) => action.payload.song.bpm,
    [shared.actions.ROUTE_DASHBOARD_LOADED]: () => initialState,
  },
  reducers: {},
});
