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
    case actionTypes.SET_NOTE_REDOS:
      return {
        ...state,
        noteRedos: action.noteRedos,
      };
    case actionTypes.SET_NOTE_UNDOS:
      return {
        ...state,
        noteUndos: action.noteUndos,
      };
    case actionTypes.SET_SELECTED_NOTE_IDS:
      return {
        ...state,
        selectedNoteIds: action.selectedNoteIds,
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
          x: 3,
          y: 40,
        },
      }),
    ],
  };
}

function getInitialState() {
  return {
    notes: [],
    noteRedos: [],
    noteUndos: [],
    selectedNoteIds: [],
  };
}
