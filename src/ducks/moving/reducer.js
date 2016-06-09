import { combineReducers } from 'redux';
import * as actionTypes from './action-types';

const isMoving = (state = false, action) => {
  switch (action.type) {
    case actionTypes.START:
      return true;
    case actionTypes.STOP:
      return false;
    default:
      return state;
  }
};

const newPoint = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.SET_NEW_POINT:
      return action.newPoint;
    case actionTypes.STOP:
      return {};
    default:
      return state;
  }
};

export default combineReducers({
  isMoving,
  newPoint,
});
