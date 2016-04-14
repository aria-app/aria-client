const actions = {
  ADD_NOTE: 'ADD_NOTE',
  DELETE_NOTES: 'DELETE_NOTES',
  SELECT_NOTES: 'SELECT_NOTES',
  SET_MEASURE_COUNT: 'SET_MEASURE_COUNT',
  SET_POSITION: 'SET_POSITION',
  SET_SYNTH: 'SET_SYNTH',
};

export default actions;

export function addNote(note) {
  return {
    type: actions.ADD_NOTE,
    note,
  };
}

export function deleteNotes(notes) {
  return {
    type: actions.DELETE_NOTES,
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
