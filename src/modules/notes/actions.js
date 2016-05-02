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

export function move(note, offset) {
  return (dispatch) => {
    const updatedNote = helpers.createNote({
      id: note.id,
      position: helpers.addPositions(note.position, offset),
    });
    dispatch(sound.actions.playNote(updatedNote.name));
    dispatch(update(updatedNote));
  };
}

export function remove(note) {
  return {
    type: actionTypes.REMOVE,
    note,
  };
}

export function select(note) {
  return {
    type: actionTypes.SELECT,
    note,
  };
}

export function update(note) {
  return {
    type: actionTypes.UPDATE,
    note,
  };
}
