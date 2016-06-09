import { combineReducers } from 'redux';
import * as actionTypes from './action-types';

const isMoving = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.SET_IS_MOVING:
      return action.isMoving;
    default:
      return state;
  }
};

const newPoint = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.SET_NEW_POINT:
      return action.newPoint;
    default:
      return state;
  }
};

export default combineReducers({
  isMoving,
  newPoint,
});
