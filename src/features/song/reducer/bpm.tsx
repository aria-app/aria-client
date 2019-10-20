import { createSlice, PayloadAction } from 'redux-starter-kit';
import shared from '../../shared';
import { Song } from '../../shared/types';
import * as actions from '../actions';

const initialState = 120;

export default createSlice<number, {}>({
  name: 'bpm',
  initialState,
  extraReducers: {
    [actions.bpmSet.type]: (state, action: PayloadAction<number>) =>
      action.payload,
    [actions.songLoaded.type]: (state, action: PayloadAction<Song>) =>
      action.payload.bpm,
    [shared.actions.ROUTE_DASHBOARD_LOADED]: () => initialState,
  },
  reducers: {},
});
