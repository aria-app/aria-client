import { createLogic } from "redux-logic";
import * as selectors from "../selectors";
import shared from "../../shared";
import dawww from "../dawww";

export const subscribeToPosition = createLogic({
  type: shared.actions.INITIALIZED,
  processOptions: { dispatchMultiple: true },
  warnTimeout: 0,
  process({ getState }, dispatch) {
    dawww.onPositionChange(position => {
      const prevPosition = selectors.getPosition(getState());

      if (position === prevPosition) return;

      dispatch(shared.actions.positionRequestSucceeded(position));
    });
  }
});
