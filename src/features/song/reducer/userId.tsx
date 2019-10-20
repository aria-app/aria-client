import { createSlice, PayloadAction } from 'redux-starter-kit';
import shared from '../../shared';
import { Song } from '../../shared/types';
import * as actions from '../actions';

const initialState = '';

export default createSlice<string, {}>({
  name: 'userId',
  initialState,
  extraReducers: {
    [actions.songLoaded.type]: (state, action: PayloadAction<Song>) =>
      action.payload.userId,
    [shared.actions.ROUTE_DASHBOARD_LOADED]: () => initialState,
  },
  reducers: {},
});
