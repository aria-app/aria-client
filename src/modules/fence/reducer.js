import actionTypes from './action-types';

export default function reducer(state = getInitialState(), action) {
  switch (action.type) {
    case actionTypes.SET_IS_SELECTING:
      return {
        ...state,
        isSelecting: action.isSelecting,
      };
    case actionTypes.SET_OFFSET:
      return {
        ...state,
        offset: action.offset,
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
    offset: undefined,
    startPosition: undefined,
  };
}
