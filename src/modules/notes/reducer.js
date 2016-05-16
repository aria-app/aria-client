import _ from 'lodash';
import actionTypes from './action-types';
import * as helpers from './helpers';

export default function reducer(state = getInitialStateWithNotes(), action) {
  switch (action.type) {
    case actionTypes.ADD:
      return {
        ...state,
        notes: [
          ...state.notes,
          ...action.notes,
        ],
      };
    case actionTypes.REMOVE:
      return {
        ...state,
        notes: _.difference(state.notes, action.notes),
        selectedNoteIds: [],
      };
    case actionTypes.SET_SELECTED_NOTE_IDS:
      return {
        ...state,
        selectedNoteIds: action.selectedNoteIds,
      };
    case actionTypes.UPDATE:
      return {
        ...state,
        notes: replaceItemsById(state.notes, action.notes),
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
          y: 47,
        },
        endPosition: {
          x: 2,
          y: 47,
        },
      }),
    ],
  };
}

function getInitialState() {
  return {
    notes: [],
    selectedNoteIds: [],
  };
}

function replaceItemsById(list, items) {
  return list.map(i => {
    const newItem = _.find(items, { id: i.id });
    return newItem || i;
  });
}
