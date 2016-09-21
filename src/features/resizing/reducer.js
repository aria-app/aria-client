import { combineReducers } from 'redux';
import * as actions from './actions';

const isResizing = (state = false, action) => {
  switch (action.type) {
    case actions.STARTED:
      return true;
    case actions.STOPPED:
      return false;
    default:
      return state;
  }
};

const newPoint = (state = {}, action) => {
  switch (action.type) {
    case actions.NEW_POINT_SET:
      return action.newPoint;
    case actions.STOPPED:
      return {};
    default:
      return state;
  }
};

export default combineReducers({
  isResizing,
  newPoint,
});
