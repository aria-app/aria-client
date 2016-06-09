import * as actionTypes from './action-types';

export default function reducer(state = getInitialState(), action) {
  switch (action.type) {
    case actionTypes.SET_IS_SELECTING:
      return {
        ...state,
        isSelecting: action.isSelecting,
      };
    case actionTypes.SET_NEW_POINT:
      return {
        ...state,
        newPoint: action.newPoint,
      };
    case actionTypes.SET_START_POSITION:
      return {
        ...state,
        startPoint: action.startPoint,
      };
    default:
      return state;
  }
}

function getInitialState() {
  return {
    isSelecting: false,
    newPoint: undefined,
    startPoint: undefined,
  };
}
