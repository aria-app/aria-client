import * as actionTypes from './action-types';

export default function reducer(state = getInitialState(), action) {
  switch (action.type) {
    case actionTypes.SET_IS_RESIZING:
      return {
        ...state,
        isResizing: action.isResizing,
      };
    case actionTypes.SET_NEW_POINT:
      return {
        ...state,
        newPoint: action.newPoint,
      };
    default:
      return state;
  }
}

function getInitialState() {
  return {
    isResizing: false,
    newPoint: undefined,
  };
}
