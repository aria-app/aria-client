import { createLogic } from "redux-logic";
import shared from "../../shared";
import dawww from "../dawww";

export const pause = createLogic({
  type: shared.actions.PLAYBACK_PAUSE_REQUEST_STARTED,
  process(args, dispatch, done) {
    dawww.pause();

    done();
  },
});
