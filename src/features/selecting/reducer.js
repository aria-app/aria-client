import { combineReducers } from 'redux';
import * as actionTypes from './action-types';

const isSelecting = (state = false, action) => {
  switch (action.type) {
    case actionTypes.STARTED:
      return true;
    case actionTypes.STOPPED:
      return false;
    default:
      return state;
  }
};

const newPoint = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.NEW_POINT_SET:
      return action.newPoint;
    case actionTypes.STOPPED:
      return {};
    default:
      return state;
  }
};

const startPoint = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.START_POINT_SET:
      return action.startPoint;
    case actionTypes.STOPPED:
      return {};
    default:
      return state;
  }
};

export default combineReducers({
  isSelecting,
  newPoint,
  startPoint,
});