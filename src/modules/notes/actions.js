import sound from 'modules/sound';
import actionTypes from './actionTypes';
import * as helpers from './helpers';
import selectors from './selectors';

export function addNotes(notes) {
  return {
    type: actionTypes.ADD_NOTES,
    notes,
  };
}

export function deleteNote(note) {
  return {
    type: actionTypes.DELETE_NOTE,
    note,
  };
}

export function drawNote(position) {
  return (dispatch) => {
    const note = helpers.createNote({ position });
    dispatch(sound.actions.playNote(note.name));
    dispatch(addNotes([note]));
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
      console.log('Note Position', draggedNote.position);
      console.log('Offset', offset);
      console.log('Next Position', helpers.addPositions(draggedNote.position, offset));

      dispatch(moveNote(
        selectedNote,
        helpers.addPositions(draggedNote.position, offset)
      ));
    }
    dispatch(setDragOffset(offset));
  };
}

export function eraseNote(note) {
  return {
    type: actionTypes.ERASE_NOTE,
    note,
  };
}

export function moveNote(note, newPosition) {
  return (dispatch) => {
    const updatedNote = helpers.createNote({
      id: note.id,
      position: newPosition,
    });
    dispatch(sound.actions.playNote(updatedNote.name));
    dispatch(updateNote(updatedNote));
  };
}

export function selectNote(note) {
  return {
    type: actionTypes.SELECT_NOTE,
    note,
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

export function updateNote(note) {
  return {
    type: actionTypes.UPDATE_NOTE,
    note,
  };
}
