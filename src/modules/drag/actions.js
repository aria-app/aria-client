import notes from 'modules/notes';
import actionTypes from './actionTypes';
import * as helpers from './helpers';
import selectors from './selectors';

export function drag(newPosition) {
  return (dispatch, getState) => {
    const dragOffset = selectors.getOffset(getState());
    const dragStartPosition = selectors.getStartPosition(getState());
    const selectedNote = notes.selectors.getSelectedNote(getState());
    const note = selectors.getNote(getState());
    const offset = helpers.getPositionOffset(dragStartPosition, newPosition);
    if (dragOffset) {
      dispatch(notes.actions.move(
        selectedNote,
        helpers.addPositions(note.position, offset)
      ));
    }
    dispatch(setOffset(offset));
  };
}

export function setIsDragging(isDragging) {
  return {
    type: actionTypes.SET_IS_DRAGGING,
    isDragging,
  };
}

export function setNote(note) {
  return {
    type: actionTypes.SET_NOTE,
    note,
  };
}

export function setOffset(offset) {
  return {
    type: actionTypes.SET_OFFSET,
    offset,
  };
}

export function setStartPosition(startPosition) {
  return {
    type: actionTypes.SET_START_POSITION,
    startPosition,
  };
}

export function startDragging(startPosition) {
  return (dispatch, getState) => {
    const selectedNote = notes.selectors.getSelectedNote(getState());

    if (!selectedNote) return;

    dispatch(setIsDragging(true));
    dispatch(setNote(selectedNote));
    dispatch(setStartPosition(startPosition));
  };
}

export function stopDragging() {
  return (dispatch) => {
    dispatch(setIsDragging(false));
  };
}
