import _ from 'lodash';
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
    const dragEvent = selectors.getDragEvent(getState());
    const offset = helpers.getPositionOffset(dragEvent.startPosition, newPosition);
    if (dragEvent.offset) {
      dispatch(moveNote(
        dragEvent.note,
        helpers.addPositions(dragEvent.note.position, offset)
      ));
    }

    dispatch(setDragEvent({
      ...dragEvent,
      offset,
    }));
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
    console.log(startPosition);
    const selectedNote = selectors.getSelectedNote(getState());

    if (!selectedNote) return;

    dispatch(setDragEvent({
      note: selectedNote,
      startPosition,
    }));
  };
}

export function stopDragging() {
  return (dispatch) => {
    dispatch(setDragEvent(undefined));
  };
}

export function setDragEvent(dragEvent) {
  console.log('DragEvent', dragEvent)
  return {
    type: actionTypes.SET_DRAG_EVENT,
    dragEvent,
  };
}

export function updateNote(note) {
  return {
    type: actionTypes.UPDATE_NOTE,
    note,
  };
}
