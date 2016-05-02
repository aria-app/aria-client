import actionTypes from './actionTypes';

export default function reducer(state = getInitialState(), action) {
  switch (action.type) {
    case actionTypes.SET_NOTE:
      return {
        ...state,
        note: action.note,
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
    case actionTypes.SET_IS_DRAGGING:
      return {
        ...state,
        isDragging: action.isDragging,
      };
    default:
      return state;
  }
}

function getInitialState() {
  return {
    note: undefined,
    offset: undefined,
    startPosition: undefined,
    isDragging: false,
  };
}
