import omit from "lodash/fp/omit";
import Dawww from "dawww";
import { createReducer } from "redux-create-reducer";
import shared from "../../shared";

export const userSongLibrary = createReducer(
  {},
  {
    [shared.actions.DASHBOARD_LOADED]: (state, action) => ({}),

    [shared.actions.SONG_ADD_REQUEST_SUCCEEDED]: (state, action) =>
      Dawww.setAtIds([action.payload.song], state),

    [shared.actions.SONG_DELETE_REQUEST_SUCCEEDED]: (state, action) =>
      omit(action.payload.song.id, state),

    [shared.actions.USER_SONG_LIBRARY_FETCH_REQUEST_SUCCEEDED]: (
      state,
      action,
    ) => Dawww.setAtIds(action.payload.userSongLibrary, state),
  },
);
