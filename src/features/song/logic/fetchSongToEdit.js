import isEmpty from "lodash/fp/isEmpty";
import isEqual from "lodash/fp/isEqual";
import { createLogic } from "redux-logic";
import shared from "../../shared";
import * as helpers from "../helpers";
import * as selectors from "../selectors";

export const fetchSongToEdit = createLogic({
  type: [
    shared.actions.SEQUENCE_EDITOR_LOADED,
    shared.actions.SONG_EDITOR_LOADED,
  ],
  warnTimeout: 0,
  process({ action, getState }, dispatch, done) {
    helpers.fetchSongById(action.payload.songId).then(song => {
      const prevSong = selectors.getSong(getState());

      if (isEmpty(song) || isEqual(prevSong, song)) {
        done();
        return;
      }

      dispatch(shared.actions.songLoaded(song));

      done();
    });
  },
});
