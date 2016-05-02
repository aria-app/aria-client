import actionTypes from './actionTypes';

export default function reducer(state = getInitialState(), action) {
  switch (action.type) {
    case actionTypes.SET_HELD_KEYS:
      return {
        ...state,
        heldKeys: action.heldKeys,
      };
    default:
      return state;
  }
}

function getInitialState() {
  return {
    heldKeys: [],
  };
}
