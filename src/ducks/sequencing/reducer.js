import { combineReducers } from 'redux';
import shared from 'ducks/shared';
import * as actionTypes from './action-types';

const { defaultToolType } = shared.constants;

const mousePoint = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.SET_MOUSE_POINT:
      return action.point;
    default:
      return state;
  }
};

const previousToolType = (state = '', action) => {
  switch (action.type) {
    case actionTypes.SET_TOOL_TYPE:
      return action.previousToolType;
    default:
      return state;
  }
};

const scrollLeft = (state = 0, action) => {
  switch (action.type) {
    case actionTypes.SET_SCROLL_LEFT:
      return action.scrollLeft;
    default:
      return state;
  }
};

const scrollTop = (state = 0, action) => {
  switch (action.type) {
    case actionTypes.SET_SCROLL_TOP:
      return action.scrollTop;
    default:
      return state;
  }
};

const toolType = (state = defaultToolType, action) => {
  switch (action.type) {
    case actionTypes.SET_TOOL_TYPE:
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
