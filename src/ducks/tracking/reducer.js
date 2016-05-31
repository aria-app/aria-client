import * as actionTypes from './action-types';

const initialState = getInitialState();

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_SELECTED_SEQUENCE_ID:
      return {
        ...state,
        selectedSequenceId: action.selectedSequenceId,
      };
    default:
      return state;
  }
}

function getInitialState() {
  return {
    selectedSequenceId: 0,
  };
}
