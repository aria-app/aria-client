import actionTypes from './action-types';

export default function reducer(state = getInitialState(), action) {
  switch (action.type) {
    case actionTypes.SET_NEW_POSITION:
      return {
        ...state,
        newPosition: action.newPosition,
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
    isDragging: false,
    newPosition: undefined,
  };
}
