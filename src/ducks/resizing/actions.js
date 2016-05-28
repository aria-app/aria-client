import _ from 'lodash';
import notes from 'ducks/notes';
import sequencer from 'ducks/sequencer';
import * as actionTypes from './action-types';
import * as selectors from './selectors';

export function setIsResizing(isResizing) {
  return {
    type: actionTypes.SET_IS_RESIZING,
    isResizing,
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
    const startPoint = sequencer.selectors.getMousePoint(getState());
    dispatch(setIsResizing(true));
    dispatch(setNewPoint(startPoint));
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
    dispatch(setNewPoint(undefined));
  };
}

export function update() {
  return (dispatch, getState) => {
    const newPoint = sequencer.selectors.getMousePoint(getState());
    const previousPoint = selectors.getNewPoint(getState());

    if (!previousPoint) {
      dispatch(setNewPoint(newPoint));
      return;
    }

    if (_.isEqual(previousPoint, newPoint)) return;

    const selectedNotes = notes.selectors.getSelectedNotes(getState());
    const change = {
      x: newPoint.x - previousPoint.x,
      y: newPoint.y - previousPoint.y,
    };

    dispatch(notes.actions.resize(
      selectedNotes,
      change
    ));

    dispatch(setNewPoint(newPoint));
  };
}
