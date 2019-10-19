import { createSlice } from 'redux-starter-kit';
import shared from '../../shared';
import * as actions from '../actions';

const initialState = '';

export default createSlice({
  name: 'name',
  initialState,
  extraReducers: {
    [actions.SONG_LOADED]: (state, action) => action.payload.song.name,
    [shared.actions.ROUTE_DASHBOARD_LOADED]: () => initialState,
  },
  reducers: {},
});
