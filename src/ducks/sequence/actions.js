import _ from 'lodash';
import notes from 'ducks/notes';
import shared from 'ducks/shared';
import sound from 'ducks/sound';
import actionTypes from './action-types';
import * as selectors from './selectors';

const { toolTypes } = shared.constants;

export function changeSynthType(synthType) {
  return (dispatch, getState) => {
    if (synthType === selectors.getSynthType(getState())) return;
    dispatch(setSynthType(synthType));
    dispatch(sound.actions.updateSynths(synthType));
  };
}

export function setMousePoint(mousePoint) {
  return {
    type: actionTypes.SET_MOUSE_POSITION,
    mousePoint,
  };
}

export function setScrollLeft(scrollLeft) {
  return {
    type: actionTypes.SET_SCROLL_LEFT,
    scrollLeft,
  };
}

export function setScrollLeftIfChanged(scrollLeft) {
  return (dispatch, getState) => {
    const prevScrollLeft = selectors.getScrollLeft(getState());

    if (prevScrollLeft === scrollLeft) return;

    dispatch(setScrollLeft(scrollLeft));
  };
}

export function setScrollTop(scrollTop) {
  return {
    type: actionTypes.SET_SCROLL_TOP,
    scrollTop,
  };
}

export function setScrollTopIfChanged(scrollTop) {
  return (dispatch, getState) => {
    const prevScrollTop = selectors.getScrollTop(getState());

    if (prevScrollTop === scrollTop) return;

    dispatch(setScrollTop(scrollTop));
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

export function updateMousePoint(mousePoint) {
  return (dispatch, getState) => {
    const prevMousePoint = selectors.getMousePoint(getState());

    if (_.isEqual(prevMousePoint, mousePoint)) return;

    dispatch(setMousePoint(mousePoint));
  };
}
