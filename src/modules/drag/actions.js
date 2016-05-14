import _ from 'lodash';
import notes from 'modules/notes';
import actionTypes from './action-types';
import * as helpers from './helpers';
import selectors from './selectors';

export function drag(newPosition) {
  return (dispatch, getState) => {
    const previousPosition = selectors.getNewPosition(getState());

    if (!previousPosition) {
      dispatch(setNewPosition(newPosition));
      return;
    }

    if (_.isEqual(previousPosition, newPosition)) return;

    const selectedNotes = notes.selectors.getSelectedNotes(getState());
    const offset = helpers.getPositionOffset(previousPosition, newPosition);

    dispatch(notes.actions.move(
      selectedNotes,
      offset
    ));

    dispatch(setNewPosition(newPosition));
  };
}

export function setIsDragging(isDragging) {
  return {
    type: actionTypes.SET_IS_DRAGGING,
    isDragging,
  };
}

export function setNewPosition(newPosition) {
  return {
    type: actionTypes.SET_NEW_POSITION,
    newPosition,
  };
}

export function startDragging() {
  return (dispatch, getState) => {
    dispatch(setIsDragging(true));
    window.addEventListener('mouseup', () => {
      const isDragging = selectors.getIsDragging(getState());
      if (isDragging) {
        dispatch(stopDragging());
      }
    });
  };
}

export function stopDragging() {
  return (dispatch, getState) => {
    if (!selectors.getIsDragging(getState())) return;
    dispatch(setIsDragging(false));
    dispatch(setNewPosition(undefined));
  };
}
