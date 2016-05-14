import _ from 'lodash';
import notes from 'modules/notes';
import sound from 'modules/sound';
import actionTypes from './action-types';
import { toolTypes } from './constants';
import * as helpers from './helpers';
import selectors from './selectors';

export function changeSynthType(synthType) {
  return (dispatch) => {
    dispatch(setSynthType(synthType));
    dispatch(sound.actions.setSynth(synthType));
  };
}

export function panUpdate(elementRef, e) {
  return (dispatch, getState) => {
    const panStartPosition = selectors.getPanStartPosition(getState());
    helpers.panScrollContainer(elementRef, e, panStartPosition);
  };
}

export function setIsPanning(isPanning) {
  return {
    type: actionTypes.SET_IS_PANNING,
    isPanning,
  };
}

export function setSynthType(synthType) {
  return {
    type: actionTypes.SET_SYNTH_TYPE,
    synthType,
  };
}

export function setToolType(toolType) {
  return (dispatch) => {
    if (_.includes([toolTypes.DRAW, toolTypes.ERASE], toolType)) {
      dispatch(notes.actions.selectNotes([]));
    }
    dispatch(setToolTypeInner(toolType));
  };
}

export function setToolTypeInner(toolType) {
  return {
    type: actionTypes.SET_TOOL_TYPE,
    toolType,
  };
}

export function setPanStartPosition(panStartPosition) {
  return {
    type: actionTypes.SET_PAN_START_POSITION,
    panStartPosition,
  };
}

export function panStart(elementRef, e) {
  return (dispatch, getState) => {
    const panStartPosition = helpers.getPanStartPosition(elementRef, e);
    dispatch(setIsPanning(true));
    dispatch(setPanStartPosition(panStartPosition));
    window.addEventListener('mouseup', () => {
      const isPanning = selectors.getIsPanning(getState());
      if (isPanning) {
        dispatch(panEnd());
      }
    });
  };
}

export function panEnd() {
  return (dispatch, getState) => {
    if (!selectors.getIsPanning(getState())) return;
    dispatch(setIsPanning(false));
  };
}
