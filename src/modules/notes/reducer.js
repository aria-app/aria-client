import _ from 'lodash';
import actionTypes from './actionTypes';
import { createNote } from './helpers';

export default function reducer(state = getInitialStateWithNotes(), action) {
  switch (action.type) {
    case actionTypes.ADD_NOTES:
      return _.assign({}, state, {
        notes: state.notes.concat(action.notes),
      });
    case actionTypes.DELETE_NOTE:
      return _.assign({}, state, {
        notes: _.without(state.notes, action.note),
        selectedNote: undefined,
      });
    case actionTypes.ERASE_NOTE:
      return _.assign({}, state, {
        notes: _.without(state.notes, action.note),
      });
    case actionTypes.SELECT_NOTE:
      return _.assign({}, state, {
        selectedNote: action.note,
      });
    case actionTypes.SET_DRAG_EVENT:
      return _.assign({}, state, {
        dragEvent: action.dragEvent,
      });
    case actionTypes.UPDATE_DRAG_EVENT:
      return _.assign({}, state, {
        dragEvent: action.dragEvent,
      });
    case actionTypes.UPDATE_NOTE:
      return {
        ...state,
        notes: replaceItemById(state.notes, action.note),
      };
    default:
      return state;
  }
}

function getInitialStateWithNotes() {
  return _.assign({}, getInitialState(), {
    notes: [
      createNote({
        length: '32n',
        position: {
          x: 0,
          y: 47,
        },
      }),
      createNote({
        length: '32n',
        position: {
          x: 2,
          y: 45,
        },
      }),
      createNote({
        length: '32n',
        position: {
          x: 4,
          y: 43,
        },
      }),
      createNote({
        length: '32n',
        position: {
          x: 6,
          y: 40,
        },
      }),
    ],
  });
}

function getInitialState() {
  return {
    dragEvent: undefined,
    notes: [],
    selectedNote: undefined,
  };
}

function replaceItemById(list, item) {
  const index = _.findIndex(list, i => i.id === item.id);
  return [
    ...list.slice(0, index),
    item,
    ...list.slice(index + 1),
  ];
}
