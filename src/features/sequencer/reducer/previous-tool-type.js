import { createReducer } from 'redux-create-reducer';
import shared from '../../shared';

export default createReducer('', {
  [shared.actions.TOOL_SELECTED]: (state, action) =>
    action.previousToolType,
});
