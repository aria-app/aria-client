import sound from 'modules/sound';
import actionTypes from './actionTypes';
import * as helpers from './helpers';
import selectors from './selectors';

export function add(note) {
  return {
    type: actionTypes.ADD,
    note,
  };
}

export function draw(position) {
  return (dispatch) => {
    const note = helpers.createNote({ position });
    dispatch(sound.actions.playNote(note.name));
    dispatch(add(note));
  };
}

export function erase(note) {
  return (dispatch) => {
    dispatch(remove(note));
  };
}

export function move(notes, offset) {
  return (dispatch) => {
    const updatedNotes = notes.map(note => helpers.createNote({
      id: note.id,
      position: helpers.addPositions(note.position, offset),
    }));

    dispatch(sound.actions.playNote(updatedNotes[0].name));
    dispatch(update(updatedNotes));
  };
}

export function remove(notes) {
  return {
    type: actionTypes.REMOVE,
    notes,
  };
}

export function select(notes) {
  return (dispatch) => {
    dispatch(setSelectedNoteIds(notes.map(n => n.id)));
  };
}

export function setSelectedNoteIds(selectedNoteIds) {
  return {
    type: actionTypes.SET_SELECTED_NOTE_IDS,
    selectedNoteIds,
  };
}

export function update(notes) {
  return {
    type: actionTypes.UPDATE,
    notes,
  };
}
