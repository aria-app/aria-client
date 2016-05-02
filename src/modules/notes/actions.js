import sound from 'modules/sound';
import actionTypes from './actionTypes';
import * as helpers from './helpers';
import selectors from './selectors';

export function add(note) {
  return {
    type: actionTypes.ADD,
    note,
  };
}

export function draw(position) {
  return (dispatch) => {
    const note = helpers.createNote({ position });
    dispatch(sound.actions.playNote(note.name));
    dispatch(add(note));
  };
}

export function drag(newPosition) {
  return (dispatch, getState) => {
    const dragOffset = selectors.getDragOffset(getState());
    const dragStartPosition = selectors.getDragStartPosition(getState());
    const selectedNote = selectors.getSelectedNote(getState());
    const draggedNote = selectors.getDraggedNote(getState());
    const offset = helpers.getPositionOffset(dragStartPosition, newPosition);
    if (dragOffset) {
      dispatch(move(
        selectedNote,
        helpers.addPositions(draggedNote.position, offset)
      ));
    }
    dispatch(setDragOffset(offset));
  };
}

export function erase(note) {
  return (dispatch) => {
    dispatch(remove(note));
  };
}

export function move(note, newPosition) {
  return (dispatch) => {
    const updatedNote = helpers.createNote({
      id: note.id,
      position: newPosition,
    });
    dispatch(sound.actions.playNote(updatedNote.name));
    dispatch(update(updatedNote));
  };
}

export function remove(note) {
  return {
    type: actionTypes.REMOVE,
    note,
  };
}

export function select(note) {
  return {
    type: actionTypes.SELECT,
    note,
  };
}

export function setDraggedNote(draggedNote) {
  return {
    type: actionTypes.SET_DRAGGED_NOTE,
    draggedNote,
  };
}

export function setDragOffset(dragOffset) {
  return {
    type: actionTypes.SET_DRAG_OFFSET,
    dragOffset,
  };
}

export function setDragStartPosition(dragStartPosition) {
  return {
    type: actionTypes.SET_DRAG_START_POSITION,
    dragStartPosition,
  };
}

export function setIsDragging(isDragging) {
  return {
    type: actionTypes.SET_IS_DRAGGING,
    isDragging,
  };
}

export function startDragging(startPosition) {
  return (dispatch, getState) => {
    const selectedNote = selectors.getSelectedNote(getState());

    if (!selectedNote) return;

    dispatch(setIsDragging(true));
    dispatch(setDraggedNote(selectedNote));
    dispatch(setDragStartPosition(startPosition));
  };
}

export function stopDragging() {
  return (dispatch) => {
    dispatch(setIsDragging(false));
  };
}

export function update(note) {
  return {
    type: actionTypes.UPDATE,
    note,
  };
}
