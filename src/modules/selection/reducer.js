import actionTypes from './action-types';

export default function reducer(state = getInitialState(), action) {
  switch (action.type) {
    case actionTypes.SET_IS_SELECTING:
      return {
        ...state,
        isSelecting: action.isSelecting,
      };
    case actionTypes.SET_NEW_POSITION:
      return {
        ...state,
        newPosition: action.newPosition,
      };
    case actionTypes.SET_START_POSITION:
      return {
        ...state,
        startPosition: action.startPosition,
      };
    default:
      return state;
  }
}

function getInitialState() {
  return {
    isSelecting: false,
    newPosition: undefined,
    startPosition: undefined,
  };
}
