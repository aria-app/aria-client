import { createLogic } from 'redux-logic';
import shared from '../../shared';
import shortcuts from '../../shortcuts';
import * as selectors from '../selectors';

const { toolTypes } = shared.constants;

export const startPanning = createLogic({
  type: shortcuts.actions.PAN_HELD,
  process({ getState }, dispatch, done) {
    const toolType = selectors.getToolType(getState());

    dispatch(shared.actions.toolSelected({
      toolType: toolTypes.PAN,
      previousToolType: toolType,
    }));

    done();
  },
});
