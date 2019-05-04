import { createLogic } from "redux-logic";
import shared from "../../shared";
import dawww from "../dawww";

export const subscribeToState = createLogic({
  type: shared.actions.INITIALIZED,
  processOptions: { dispatchMultiple: true },
  warnTimeout: 0,
  process(args, dispatch) {
    dawww.onStateChange(playbackState => {
      dispatch(shared.actions.playbackStateRequestSucceeded(playbackState));
    });
  },
});
