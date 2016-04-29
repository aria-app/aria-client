import actionTypes from './actionTypes';

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

export function setSynth(synth) {
  return {
    type: actionTypes.SET_SYNTH,
    synth,
  };
}

export function setTool(tool) {
  return {
    type: actionTypes.SET_TOOL,
    tool,
  };
}
