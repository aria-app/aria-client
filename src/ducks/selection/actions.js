import _ from 'lodash';
import notes from 'ducks/notes';
import sequencer from 'ducks/sequencer';
import song from 'ducks/song';
import * as actionTypes from './action-types';
import * as helpers from './helpers';
import * as selectors from './selectors';

export function setIsSelecting(isSelecting) {
  return {
    type: actionTypes.SET_IS_SELECTING,
    isSelecting,
  };
}

export function setNewPoint(newPoint) {
  return {
    type: actionTypes.SET_NEW_POINT,
    newPoint,
  };
}

export function setStartPoint(startPoint) {
  return {
    type: actionTypes.SET_START_POSITION,
    startPoint,
  };
}

export function start(isAdditive) {
  return (dispatch, getState) => {
    const startPoint = sequencer.selectors.getMousePoint(getState());
    dispatch(setIsSelecting(true));
    dispatch(setStartPoint(startPoint));
    dispatch(setNewPoint(startPoint));
    if (!isAdditive) {
      dispatch(notes.actions.selectNotes([]));
    }
    window.addEventListener('mouseup', () => {
      const isSelecting = selectors.getIsSelecting(getState());
      if (isSelecting) {
        dispatch(stop());
      }
    });
  };
}

export function stop() {
  return (dispatch, getState) => {
    if (!selectors.getIsSelecting(getState())) return;
    dispatch(setIsSelecting(false));
    dispatch(setNewPoint(undefined));
  };
}

export function update(isAdditive) {
  return (dispatch, getState) => {
    const newPoint = sequencer.selectors.getMousePoint(getState());
    const previousPoint = selectors.getNewPoint(getState());

    if (_.isEqual(previousPoint, newPoint)) return;

    const startPoint = selectors.getStartPoint(getState());
    const allNotes = song.selectors.getActiveSequenceNotes(getState());
    const selectedNotes = notes.selectors.getSelectedNotes(getState());
    const notesToSelect = helpers.getNotesInFence(startPoint, newPoint, allNotes);

    if (_.isEqual(notesToSelect, selectedNotes)) {
      dispatch(setNewPoint(newPoint));
      return;
    }

    if (isAdditive) {
      dispatch(notes.actions.selectNotes([
        ...selectedNotes,
        ...notesToSelect,
      ]));
    } else {
      dispatch(notes.actions.selectNotes(notesToSelect));
    }

    dispatch(setNewPoint(newPoint));
  };
}
