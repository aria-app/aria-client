import omit from 'lodash/fp/omit';
import { createSlice, PayloadAction } from 'redux-starter-kit';
import Dawww from '../../../dawww';
import shared from '../../shared';
import { Song } from '../../shared/types';
import * as actions from '../actions';

export default createSlice<{ [key: string]: Song }, {}>({
  name: 'userSongLibrary',
  initialState: {},
  extraReducers: {
    [shared.actions.ROUTE_DASHBOARD_LOADED]: () => ({}),
    [actions.songAddRequestSucceeded.type]: (
      state,
      action: PayloadAction<Song>,
    ) => Dawww.setAtIds([action.payload], state),
    [actions.songDeleteRequestSucceeded.type]: (
      state,
      action: PayloadAction<Song>,
    ) => omit(action.payload.id, state),
    [actions.userSongLibraryFetchRequestSucceeded.type]: (
      state,
      action: PayloadAction<Array<Song>>,
    ) => Dawww.setAtIds(action.payload, state),
  },
  reducers: {},
});
