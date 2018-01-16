import { createLogic } from 'redux-logic';
import shortcuts from '../../shortcuts';
import sequenceData from '../../sequence-data';

export const stopPanning = createLogic({
  type: shortcuts.actions.PAN_RELEASED,
  process({ getState }, dispatch, done) {
    const previousToolType = sequenceData.selectors.getPreviousToolType(getState());
    const toolType = sequenceData.selectors.getToolType(getState());

    dispatch(sequenceData.actions.toolSelected({
      toolType: previousToolType,
      previousToolType: toolType,
    }));

    done();
  },
});
