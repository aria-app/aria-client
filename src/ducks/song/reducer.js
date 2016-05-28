import * as actionTypes from './action-types';

export default function reducer(state = getInitialState(), action) {
  switch (action.type) {
    case actionTypes.SET_SONG:
      return {
        ...state,
        song: action.song,
      };
    default:
      return state;
  }
}

function getInitialState() {
  return {
    song: undefined,
  };
}
