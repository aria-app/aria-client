import _ from 'lodash';
import notes from 'modules/notes';
import actionTypes from './actionTypes';
import * as helpers from './helpers';
import selectors from './selectors';

export function drag(newPosition) {
  return (dispatch, getState) => {
    const previousPosition = selectors.getOffset(getState());

    if (!previousPosition) {
      dispatch(setOffset(newPosition));
      return;
    }

    if (_.isEqual(previousPosition, newPosition)) return;

    const selectedNotes = notes.selectors.getSelectedNotes(getState());
    const offset = helpers.getPositionOffset(previousPosition, newPosition);

    dispatch(notes.actions.move(
      selectedNotes,
      offset
    ));

    dispatch(setOffset(newPosition));
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

export function startDragging() {
  return (dispatch) => {
    dispatch(setIsDragging(true));
  };
}

export function stopDragging() {
  return (dispatch) => {
    dispatch(setIsDragging(false));
    dispatch(setOffset(undefined));
  };
}
