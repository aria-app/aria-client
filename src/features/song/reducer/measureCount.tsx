import { createSlice } from 'redux-starter-kit';
import shared from '../../shared';

const initialState = 1;

export default createSlice({
  name: 'measureCount',
  initialState,
  extraReducers: {
    [shared.actions.ROUTE_DASHBOARD_LOADED]: () => initialState,
    [shared.actions.MEASURE_COUNT_SET]: (state, action) =>
      action.payload.measureCount,
    [shared.actions.SONG_LOADED]: (state, action) =>
      action.payload.song.measureCount,
  },
  reducers: {},
});
