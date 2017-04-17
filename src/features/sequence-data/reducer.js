import { combineReducers } from 'redux';
import shared from '../shared';
import * as actions from './actions';

const { defaultToolType } = shared.constants;

const previousToolType = (state = '', action) => {
  switch (action.type) {
    case actions.TOOL_TYPE_SET:
      return action.payload.previousToolType;
    default:
      return state;
  }
};

const toolType = (state = defaultToolType, action) => {
  switch (action.type) {
    case actions.TOOL_TYPE_SET:
      return action.payload.toolType;
    default:
      return state;
  }
};

export default combineReducers({
  previousToolType,
  toolType,
});
