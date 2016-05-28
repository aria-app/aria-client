import _ from 'lodash';
import notes from 'ducks/notes';
import sequence from 'ducks/sequence';
import * as actionTypes from './action-types';
import * as helpers from './helpers';
import * as selectors from './selectors';

export function setIsMoving(isMoving) {
  return {
    type: actionTypes.SET_IS_MOVING,
    isMoving,
  };
}

export function setNewPoint(newPoint) {
  return {
    type: actionTypes.SET_NEW_POSITION,
    newPoint,
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
    dispatch(setNewPoint(undefined));
  };
}

export function update() {
  return (dispatch, getState) => {
    const newPoint = sequence.selectors.getMousePoint(getState());
    const previousPoint = selectors.getNewPoint(getState());

    if (!previousPoint) {
      dispatch(notes.actions.pushUndo());
      dispatch(setNewPoint(newPoint));
      return;
    }

    if (_.isEqual(previousPoint, newPoint)) return;

    const selectedNotes = notes.selectors.getSelectedNotes(getState());
    const offset = helpers.getPointOffset(previousPoint, newPoint);

    dispatch(notes.actions.move(
      selectedNotes,
      offset
    ));

    dispatch(setNewPoint(newPoint));
  };
}
