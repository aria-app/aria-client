import { combineReducers } from 'redux';
import * as actionTypes from './action-types';

const isPanning = (state = false, action) => {
  switch (action.type) {
    case actionTypes.START:
      return true;
    case actionTypes.STOP:
      return false;
    default:
      return state;
  }
};

const startPoint = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.SET_START_POINT:
      return action.startPoint;
    case actionTypes.STOP:
      return {};
    default:
      return state;
  }
};

export default combineReducers({
  isPanning,
  startPoint,
});
