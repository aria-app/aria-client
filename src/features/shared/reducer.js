import { combineReducers } from 'redux';
import * as actions from './actions';

const windowHeight = (state = window.innerHeight, action) => {
  switch (action.type) {
    case actions.WINDOW_HEIGHT_CHANGED:
      return action.height;
    default:
      return state;
  }
};

const windowWidth = (state = window.innerWidth, action) => {
  switch (action.type) {
    case actions.WINDOW_WIDTH_CHANGED:
      return action.width;
    default:
      return state;
  }
};

export default combineReducers({
  windowHeight,
  windowWidth,
});
