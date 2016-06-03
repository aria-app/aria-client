import * as actionTypes from './action-types';

const initialState = getInitialState();

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_SELECTED_SEQUENCE_ID:
      return { ...state, selectedSequenceId: action.selectedSequenceId };
    case actionTypes.SET_STAGED_TRACK:
      return { ...state, stagedTrack: action.stagedTrack };
    default:
      return state;
  }
}

function getInitialState() {
  return {
    selectedSequenceId: -1,
    stagedTrack: undefined,
  };
}
