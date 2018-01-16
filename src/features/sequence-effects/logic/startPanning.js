import { createLogic } from 'redux-logic';
import shared from '../../shared';
import shortcuts from '../../shortcuts';
import sequenceData from '../../sequence-data';

const { toolTypes } = shared.constants;

export const startPanning = createLogic({
  type: shortcuts.actions.PAN_HELD,
  process({ getState }, dispatch, done) {
    const toolType = sequenceData.selectors.getToolType(getState());

    dispatch(sequenceData.actions.toolSelected({
      toolType: toolTypes.PAN,
      previousToolType: toolType,
    }));

    done();
  },
});
