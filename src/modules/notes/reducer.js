import _ from 'lodash';
import actionTypes from './actionTypes';

export default function reducer(state = getInitialStateWithNotes(), action) {
  switch (action.type) {
    case actionTypes.ADD:
      return {
        ...state,
        notes: [
          ...state.notes,
          action.note,
        ],
      };
    case actionTypes.REMOVE:
      return {
        ...state,
        notes: _.without(state.notes, action.note),
        selectedNoteId: undefined,
      };
    case actionTypes.SELECT:
      return {
        ...state,
        selectedNoteId: action.note
          ? action.note.id
          : undefined,
      };
    case actionTypes.UPDATE:
      return {
        ...state,
        notes: replaceItemById(state.notes, action.note),
      };
    case actionTypes.SET_DRAGGED_NOTE:
    case actionTypes.SET_DRAG_OFFSET:
    case actionTypes.SET_DRAG_START_POSITION:
    case actionTypes.SET_IS_DRAGGING:
      return {
        ...state,
        drag: drag(state.drag, action),
      };
    default:
      return state;
  }
}

function drag(state, action) {
  switch (action.type) {
    case actionTypes.SET_DRAGGED_NOTE:
      return {
        ...state,
        draggedNote: action.draggedNote,
      };
    case actionTypes.SET_DRAG_OFFSET:
      return {
        ...state,
        dragOffset: action.dragOffset,
      };
    case actionTypes.SET_DRAG_START_POSITION:
      return {
        ...state,
        dragStartPosition: action.dragStartPosition,
      };
    case actionTypes.SET_IS_DRAGGING:
      return {
        ...state,
        isDragging: action.isDragging,
      };
    default:
      return state;
  }
}

function getInitialStateWithNotes() {
  const notesStr = '[{"id":"note9","name":"C3","position":{"x":8,"y":47}},{"id":"note10","name":"D3","position":{"x":10,"y":45}},{"id":"note11","name":"E3","position":{"x":12,"y":43}},{"id":"note12","name":"G3","position":{"x":14,"y":40}},{"id":"note13","name":"C2","position":{"x":0,"y":59}},{"id":"note14","name":"D2","position":{"x":2,"y":57}},{"id":"note15","name":"E2","position":{"x":4,"y":55}},{"id":"note16","name":"G2","position":{"x":6,"y":52}},{"id":"note17","name":"C4","position":{"x":16,"y":35}},{"id":"note18","name":"D4","position":{"x":18,"y":33}},{"id":"note19","name":"E4","position":{"x":20,"y":31}},{"id":"note20","name":"G4","position":{"x":22,"y":28}},{"id":"note21","name":"C5","position":{"x":24,"y":23}},{"id":"note22","name":"D5","position":{"x":26,"y":21}},{"id":"note23","name":"E5","position":{"x":28,"y":19}},{"id":"note24","name":"G5","position":{"x":30,"y":16}},{"id":"note25","name":"C6","position":{"x":32,"y":11}},{"id":"note26","name":"G5","position":{"x":34,"y":16}},{"id":"note27","name":"E5","position":{"x":36,"y":19}},{"id":"note28","name":"D5","position":{"x":38,"y":21}},{"id":"note29","name":"C5","position":{"x":40,"y":23}},{"id":"note30","name":"G4","position":{"x":42,"y":28}},{"id":"note31","name":"E4","position":{"x":44,"y":31}},{"id":"note32","name":"D4","position":{"x":46,"y":33}},{"id":"note33","name":"C4","position":{"x":48,"y":35}},{"id":"note35","name":"G3","position":{"x":50,"y":40}},{"id":"note38","name":"E3","position":{"x":52,"y":43}},{"id":"note39","name":"D3","position":{"x":54,"y":45}},{"id":"note40","name":"C3","position":{"x":56,"y":47}},{"id":"note41","name":"G2","position":{"x":58,"y":52}},{"id":"note42","name":"E2","position":{"x":60,"y":55}},{"id":"note43","name":"D2","position":{"x":62,"y":57}}]';
  const notes = JSON.parse(notesStr);
  return _.assign({}, getInitialState(), {
    notes,
  });
}

function getInitialState() {
  return {
    drag: getInitialDragState(),
    notes: [],
    selectedNoteId: undefined,
  };
}

function getInitialDragState() {
  return {
    draggedNote: undefined,
    dragOffset: undefined,
    dragStartPosition: undefined,
    isDragging: false,
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
