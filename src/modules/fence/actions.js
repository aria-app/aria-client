import _ from 'lodash';
// import drag from 'modules/drag';
import notes from 'modules/notes';
import actionTypes from './action-types';
import * as helpers from './helpers';
import * as selectors from './selectors';

export function selectInFence(newPosition, isAdditive) {
  return (dispatch, getState) => {
    const previousPosition = selectors.getNewPosition(getState());

    if (_.isEqual(previousPosition, newPosition)) return;

    const startPosition = selectors.getStartPosition(getState());
    const allNotes = notes.selectors.getNotes(getState());
    const selectedNotes = notes.selectors.getSelectedNotes(getState());
    const notesToSelect = helpers.getNotesInFence(startPosition, newPosition, allNotes);

    if (_.isEqual(notesToSelect, selectedNotes)) {
      dispatch(setNewPosition(newPosition));
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

    dispatch(setNewPosition(newPosition));
  };
}

export function setIsSelecting(isSelecting) {
  return {
    type: actionTypes.SET_IS_SELECTING,
    isSelecting,
  };
}

export function setNewPosition(newPosition) {
  return {
    type: actionTypes.SET_NEW_POSITION,
    newPosition,
  };
}

export function setStartPosition(startPosition) {
  return {
    type: actionTypes.SET_START_POSITION,
    startPosition,
  };
}

export function startSelecting(startPosition, isAdditive) {
  return (dispatch, getState) => {
    dispatch(setIsSelecting(true));
    dispatch(setStartPosition(startPosition));
    dispatch(setNewPosition(startPosition));
    if (!isAdditive) {
      dispatch(notes.actions.selectNotes([]));
    }
    window.addEventListener('mouseup', () => {
      const isSelecting = selectors.getIsSelecting(getState());
      if (isSelecting) {
        dispatch(stopSelecting());
      }
    });
  };
}

export function stopSelecting() {
  return (dispatch, getState) => {
    if (!selectors.getIsSelecting(getState())) return;
    dispatch(setIsSelecting(false));
    dispatch(setNewPosition(undefined));
  };
}
