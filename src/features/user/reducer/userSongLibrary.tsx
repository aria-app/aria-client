import omit from 'lodash/fp/omit';
import { createSlice } from 'redux-starter-kit';
import Dawww from '../../../dawww';
import shared from '../../shared';

export default createSlice({
  name: 'userSongLibrary',
  initialState: {},
  extraReducers: {
    [shared.actions.DASHBOARD_LOADED]: () => ({}),
    [shared.actions.SONG_ADD_REQUEST_SUCCEEDED]: (state, action) =>
      Dawww.setAtIds([action.payload.song], state),
    [shared.actions.SONG_DELETE_REQUEST_SUCCEEDED]: (state, action) =>
      omit(action.payload.song.id, state),
    [shared.actions.USER_SONG_LIBRARY_FETCH_REQUEST_SUCCEEDED]: (
      state,
      action,
    ) => Dawww.setAtIds(action.payload.userSongLibrary, state),
  },
  reducers: {},
});
