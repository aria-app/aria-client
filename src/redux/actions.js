const actions = {
  DELETE_NOTES: 'DELETE_NOTES',
  DRAW_NOTE: 'DRAW_NOTE',
  ERASE_NOTE: 'ERASE_NOTE',
  MOVE_NOTES: 'MOVE_NOTES',
  SELECT_NOTES: 'SELECT_NOTES',
  SET_MEASURE_COUNT: 'SET_MEASURE_COUNT',
  SET_POSITION: 'SET_POSITION',
  SET_SYNTH: 'SET_SYNTH',
  SET_TOOL: 'SET_TOOL',
};

export default actions;

export function deleteNotes(notes) {
  return {
    type: actions.DELETE_NOTES,
    notes,
  };
}

export function drawNote(note) {
  return {
    type: actions.DRAW_NOTE,
    note,
  };
}

export function eraseNote(note) {
  return {
    type: actions.ERASE_NOTE,
    note,
  };
}

export function moveNotes(notes) {
  return {
    type: actions.MOVE_NOTES,
    notes,
  };
}

export function selectNotes(notes) {
  return {
    type: actions.SELECT_NOTES,
    notes,
  };
}

export function setPosition(position) {
  return {
    type: actions.SET_POSITION,
    position,
  };
}

export function setSynth(synthType) {
  return {
    type: actions.SET_SYNTH,
    synthType,
  };
}

export function setTool(tool) {
  return {
    type: actions.SET_TOOL,
    tool,
  };
}
