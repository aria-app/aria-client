import actionTypes from './action-types';
import * as helpers from './helpers';

const initialState = getInitialStateWithNotes();

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_NOTES:
      return {
        ...state,
        notes: action.notes,
      };
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

function getInitialStateWithNotes() {
  return {
    ...getInitialState(),
    notes: [
      helpers.createNote({
        position: {
          x: 0,
          y: 40,
        },
        endPosition: {
          x: 15,
          y: 35,
        },
      }),
      helpers.createNote({
        position: {
          x: 3,
          y: 42,
        },
        endPosition: {
          x: 15,
          y: 42,
        },
      }),
    ],
  };
}

function getInitialState() {
  return {
    notes: [],
    redos: [],
    undos: [],
    selectedNoteIds: [],
  };
}
