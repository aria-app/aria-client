import omit from 'lodash/fp/omit';
import { createSlice } from 'redux-starter-kit';
import Dawww from '../../../dawww';
import shared from '../../shared';
import * as actions from '../actions';

export default createSlice({
  name: 'userSongLibrary',
  initialState: {},
  extraReducers: {
    [shared.actions.ROUTE_DASHBOARD_LOADED]: () => ({}),
    [actions.songAddRequestSucceeded.type]: (state, action) =>
      Dawww.setAtIds([action.payload], state),
    [actions.songDeleteRequestSucceeded.type]: (state, action) =>
      omit(action.payload.id, state),
    [actions.userSongLibraryFetchRequestSucceeded.type]: (state, action) =>
      Dawww.setAtIds(action.payload, state),
  },
  reducers: {},
});
