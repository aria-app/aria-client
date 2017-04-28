import { createReducer } from 'redux-create-reducer';
import shared from '../../shared';
import * as actions from '../actions';

export default createReducer(shared.constants.defaultToolType, {
  [actions.TOOL_SELECTED]: (state, action) =>
    action.toolType,
});
