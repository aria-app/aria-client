import _ from 'lodash';
import notes from 'modules/notes';
import sound from 'modules/sound';
import actionTypes from './actionTypes';
import { toolTypes } from './constants';

export function changeSynthType(synthType) {
  return (dispatch) => {
    dispatch(setSynthType(synthType));
    dispatch(sound.actions.setSynth(synthType));
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
      dispatch(notes.actions.selectNote(undefined));
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
