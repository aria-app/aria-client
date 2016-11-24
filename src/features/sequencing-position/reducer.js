import { combineReducers } from 'redux';
import * as actions from './actions';

const mousePoint = (state = {}, action) => {
  switch (action.type) {
    case actions.MOUSE_POINT_SET:
      return action.point;
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

export default combineReducers({
  mousePoint,
  scrollLeft,
  scrollTop,
});
