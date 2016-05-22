import _ from 'lodash';
import notes from 'modules/notes';
import sequence from 'modules/sequence';
import actionTypes from './action-types';
import * as helpers from './helpers';
import selectors from './selectors';

export function setIsMoving(isMoving) {
  return {
    type: actionTypes.SET_IS_MOVING,
    isMoving,
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
    dispatch(setIsMoving(true));
    window.addEventListener('mouseup', () => {
      const isMoving = selectors.getIsMoving(getState());
      if (isMoving) {
        dispatch(stop());
      }
    });
  };
}

export function stop() {
  return (dispatch, getState) => {
    if (!selectors.getIsMoving(getState())) return;
    dispatch(setIsMoving(false));
    dispatch(setNewPosition(undefined));
  };
}

export function update() {
  return (dispatch, getState) => {
    const newPosition = sequence.selectors.getMousePosition(getState());
    const previousPosition = selectors.getNewPosition(getState());

    if (!previousPosition) {
      dispatch(notes.actions.pushUndo());
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
