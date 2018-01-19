import { createLogic } from 'redux-logic';
import shared from '../../shared';
import shortcuts from '../../shortcuts';
import * as selectors from '../selectors';


export const stopPanning = createLogic({
  type: shortcuts.actions.PAN_RELEASED,
  process({ getState }, dispatch, done) {
    const previousToolType = selectors.getPreviousToolType(getState());
    const toolType = selectors.getToolType(getState());

    dispatch(shared.actions.toolSelected({
      toolType: previousToolType,
      previousToolType: toolType,
    }));

    done();
  },
});
