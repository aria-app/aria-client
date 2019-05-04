import { createLogic } from "redux-logic";
import shared from "../../shared";

const { db } = shared.constants;

export const deleteSong = createLogic({
  type: shared.actions.SONG_DELETE_REQUEST_STARTED,
  warnTimeout: 0,
  process({ action }, dispatch, done) {
    db.collection("songs")
      .doc(action.payload.song.id)
      .delete()
      .then(() => {
        dispatch(
          shared.actions.songDeleteRequestSucceeded(action.payload.song),
        );
        done();
      })
      .catch(error => {
        console.error("Error while deleting song: ", error);
      });
  },
});
