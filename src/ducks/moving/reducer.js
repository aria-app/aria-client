import * as actionTypes from './action-types';

export default function reducer(state = getInitialState(), action) {
  switch (action.type) {
    case actionTypes.SET_NEW_POSITION:
      return {
        ...state,
        newPoint: action.newPoint,
      };
    case actionTypes.SET_IS_MOVING:
      return {
        ...state,
        isMoving: action.isMoving,
      };
    default:
      return state;
  }
}

function getInitialState() {
  return {
    isMoving: false,
    newPoint: undefined,
  };
}
