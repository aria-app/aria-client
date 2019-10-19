import { createSlice } from 'redux-starter-kit';
import shared from '../../shared';
import * as actions from '../actions';

const initialState = '';

export default createSlice({
  name: 'userId',
  initialState,
  extraReducers: {
    [actions.SONG_LOADED]: (state, action) => action.payload.song.userId,
    [shared.actions.ROUTE_DASHBOARD_LOADED]: () => initialState,
  },
  reducers: {},
});
