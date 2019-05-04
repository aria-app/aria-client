import { createLogic } from "redux-logic";
import shared from "../../shared";
import song from "../../song";
import dawww from "../dawww";
import * as selectors from "../selectors";

export const updateSong = createLogic({
  type: shared.actions.dawwwUpdatingActions,
  process({ getState }, dispatch, done) {
    const songState = song.selectors.getSong(getState());
    const focusedSequenceId = selectors.getFocusedSequenceId(getState()) || "";

    dawww.updateSong({
      ...songState,
      focusedSequenceId,
    });

    done();
  },
});
