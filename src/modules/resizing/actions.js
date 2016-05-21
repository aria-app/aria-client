import _ from 'lodash';
import notes from 'modules/notes';
import sequence from 'modules/sequence';
import actionTypes from './action-types';
import * as selectors from './selectors';

export function setIsResizing(isResizing) {
  return {
    type: actionTypes.SET_IS_RESIZING,
    isResizing,
  };
}

export function setNewPosition(newPosition) {
  return {
    type: actionTypes.SET_NEW_POSITION,
    newPosition,
  };
}

export function start() {
  return (dispatch, getState) => {
    const startPosition = sequence.selectors.getMousePosition(getState());
    dispatch(setIsResizing(true));
    dispatch(setNewPosition(startPosition));
    window.addEventListener('mouseup', () => {
      const isResizing = selectors.getIsResizing(getState());
      if (isResizing) {
        dispatch(stop());
      }
    });
  };
}

export function stop() {
  return (dispatch, getState) => {
    if (!selectors.getIsResizing(getState())) return;
    dispatch(setIsResizing(false));
    dispatch(setNewPosition(undefined));
  };
}

export function update() {
  return (dispatch, getState) => {
    const newPosition = sequence.selectors.getMousePosition(getState());
    const previousPosition = selectors.getNewPosition(getState());

    if (!previousPosition) {
      dispatch(setNewPosition(newPosition));
      return;
    }

    if (_.isEqual(previousPosition, newPosition)) return;

    const selectedNotes = notes.selectors.getSelectedNotes(getState());
    const change = {
      x: newPosition.x - previousPosition.x,
      y: newPosition.y - previousPosition.y,
    };

    dispatch(notes.actions.resize(
      selectedNotes,
      change
    ));

    dispatch(setNewPosition(newPosition));
  };
}
