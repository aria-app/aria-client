import * as actionTypes from './action-types';

const initialState = getInitialState();

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CLEAR_STAGED_TRACK:
      return { ...state, stagedTrack: undefined };
    case actionTypes.SET_SELECTED_SEQUENCE_ID:
      return { ...state, selectedSequenceId: action.selectedSequenceId };
    case actionTypes.STAGE_TRACK:
      return { ...state, stagedTrack: action.track };
    default:
      return state;
  }
}

function getInitialState() {
  return {
    selectedSequenceId: undefined,
    stagedTrack: undefined,
  };
}
