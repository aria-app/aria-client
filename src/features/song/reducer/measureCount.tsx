import { createSlice } from 'redux-starter-kit';
import shared from '../../shared';
import * as actions from '../actions';

const initialState = 1;

export default createSlice({
  name: 'measureCount',
  initialState,
  extraReducers: {
    [actions.MEASURE_COUNT_SET]: (state, action) => action.payload.measureCount,
    [actions.SONG_LOADED]: (state, action) => action.payload.song.measureCount,
    [shared.actions.ROUTE_DASHBOARD_LOADED]: () => initialState,
  },
  reducers: {},
});
