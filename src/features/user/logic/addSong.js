import Dawww from "dawww";
import { createLogic } from "redux-logic";
import shared from "../../shared";
import * as selectors from "../selectors";

const { db } = shared.constants;

export const addSong = createLogic({
  type: shared.actions.SONG_ADD_REQUEST_STARTED,
  warnTimeout: 0,
  process({ action, getState }, dispatch, done) {
    const user = selectors.getUser(getState());

    const song = {
      ...Dawww.createSong(),
      dateModified: Date.now(),
      userId: user.uid,
      ...action.payload.options,
    };

    db.collection("songs")
      .doc(song.id)
      .set(song)
      .then(() => {
        dispatch(shared.actions.songAddRequestSucceeded(song));
        done();
      })
      .catch(error => {
        console.error("Error while adding song: ", error);
      });
  },
});
