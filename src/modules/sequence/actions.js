import actionTypes from './actionTypes';
import sound from 'modules/sound';

export function deleteNotes(notes) {
  return {
    type: actionTypes.DELETE_NOTES,
    notes,
  };
}

export function drawNote(note) {
  return {
    type: actionTypes.DRAW_NOTE,
    note,
  };
}

export function eraseNote(note) {
  return {
    type: actionTypes.ERASE_NOTE,
    note,
  };
}

export function moveNotes(notes) {
  return {
    type: actionTypes.MOVE_NOTES,
    notes,
  };
}

export function selectNotes(notes) {
  return {
    type: actionTypes.SELECT_NOTES,
    notes,
  };
}

export function setPosition(position) {
  return {
    type: actionTypes.SET_POSITION,
    position,
  };
}

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

export function setTool(tool) {
  return {
    type: actionTypes.SET_TOOL,
    tool,
  };
}
