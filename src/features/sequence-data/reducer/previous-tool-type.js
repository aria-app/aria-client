import { createReducer } from 'redux-create-reducer';
import * as actions from '../actions';

export default createReducer('', {
  [actions.TOOL_SELECTED]: (state, action) =>
    action.previousToolType,
});
