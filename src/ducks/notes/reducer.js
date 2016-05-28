import shared from 'ducks/shared';
import * as actionTypes from './action-types';

const initialState = getInitialState();

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_REDOS:
      return {
        ...state,
        redos: action.redos,
      };
    case actionTypes.SET_SELECTED_NOTE_IDS:
      return {
        ...state,
        selectedNoteIds: action.selectedNoteIds,
      };
    case actionTypes.SET_UNDOS:
      return {
        ...state,
        undos: action.undos,
      };
    default:
      return state;
  }
}

function getInitialState() {
  return {
    redos: [],
    selectedNoteIds: [],
    undos: [],
  };
}
