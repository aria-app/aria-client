import { combineReducers } from 'redux';
import shared from '../shared';
import * as actions from './actions';

const { defaultToolType } = shared.constants;

const mousePoint = (state = {}, action) => {
  switch (action.type) {
    case actions.MOUSE_POINT_SET:
      return action.point;
    default:
      return state;
  }
};

const previousToolType = (state = '', action) => {
  switch (action.type) {
    case actions.TOOL_TYPE_SET:
      return action.previousToolType;
    default:
      return state;
  }
};

const scrollLeft = (state = 0, action) => {
  switch (action.type) {
    case actions.SCROLL_LEFT_SET:
      return action.scrollLeft;
    default:
      return state;
  }
};

const scrollTop = (state = 0, action) => {
  switch (action.type) {
    case actions.SCROLL_TOP_SET:
      return action.scrollTop;
    default:
      return state;
  }
};

const toolType = (state = defaultToolType, action) => {
  switch (action.type) {
    case actions.TOOL_TYPE_SET:
      return action.toolType;
    default:
      return state;
  }
};

export default combineReducers({
  mousePoint,
  previousToolType,
  scrollLeft,
  scrollTop,
  toolType,
});
