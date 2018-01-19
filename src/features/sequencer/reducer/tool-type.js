import { createReducer } from 'redux-create-reducer';
import shared from '../../shared';

export default createReducer(shared.constants.defaultToolType, {
  [shared.actions.TOOL_SELECTED]: (state, action) =>
    action.toolType,
});
