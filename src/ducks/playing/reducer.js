import * as actionTypes from './action-types';

const initialState = getInitialState();

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_TRACKS:
      return {
        ...state,
        tracks: action.tracks,
      };
    default:
      return state;
  }
}

function getInitialState() {
  return {
    tracks: [],
  };
}
