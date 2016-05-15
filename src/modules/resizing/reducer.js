import actionTypes from './action-types';

export default function reducer(state = getInitialState(), action) {
  switch (action.type) {
    case actionTypes.SET_IS_RESIZING:
      return {
        ...state,
        isResizing: action.isResizing,
      };
    case actionTypes.SET_NEW_POSITION:
      return {
        ...state,
        newPosition: action.newPosition,
      };
    default:
      return state;
  }
}

function getInitialState() {
  return {
    isResizing: false,
    newPosition: undefined,
  };
}
