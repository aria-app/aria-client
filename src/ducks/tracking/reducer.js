import * as actionTypes from './action-types';

const initialState = getInitialState();

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_SELECTED_SEQUENCE_IDS:
      return {
        ...state,
        selectedSequence_ids: action.selectedSequences,
      };
    default:
      return state;
  }
}

function getInitialState() {
  return {
    selectedSequenceIds: [],
  };
}
