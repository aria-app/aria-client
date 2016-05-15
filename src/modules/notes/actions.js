import _ from 'lodash';
import sequence from 'modules/sequence';
import sound from 'modules/sound';
import actionTypes from './action-types';
import * as helpers from './helpers';
import selectors from './selectors';

export function add(notes) {
  return {
    type: actionTypes.ADD,
    notes,
  };
}

export function deselect() {
  return (dispatch) => {
    dispatch(setSelectedNoteIds([]));
  };
}

export function draw(position) {
  return (dispatch) => {
    const note = helpers.createNote({
      endPosition: {
        x: position.x + 1,
        y: position.y,
      },
      position,
    });
    dispatch(sound.actions.playNote(note.name));
    dispatch(add([note]));
  };
}

export function duplicate() {
  return (dispatch, getState) => {
    const selectedNotes = selectors.getSelectedNotes(getState());

    if (_.isEmpty(selectedNotes)) return;

    const duplicatedNotes = selectedNotes.map(note => helpers.createNote({
      slots: note.slots,
      position: note.position,
      endPosition: note.endPosition,
    }));

    dispatch(add(duplicatedNotes));
    dispatch(selectNotes(duplicatedNotes));
  };
}

export function erase(note) {
  return (dispatch) => {
    dispatch(remove([note]));
  };
}

export function move(notes, offset) {
  return (dispatch, getState) => {
    const measureCount = sequence.selectors.getMeasureCount(getState());

    if (helpers.someNoteWillMoveOutside(notes, offset, measureCount)) return;

    const updatedNotes = notes.map(note => helpers.createNote({
      id: note.id,
      slots: note.slots,
      position: helpers.addPositions(note.position, offset),
      endPosition: helpers.addPositions(note.endPosition, offset),
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

export function resize(notes, change) {
  return (dispatch) => {
    const updatedNotes = notes.map(note => helpers.createNote({
      id: note.id,
      slots: note.slots + change.x !== 0 ? note.slots + change.x : 1,
      position: note.position,
      endPosition: helpers.addPositions(note.endPosition, change),
    }));

    dispatch(sound.actions.playNote(updatedNotes[0].endName));

    dispatch(update(updatedNotes));
  };
}

export function resizeSelected(change) {
  return () => (dispatch, getState) => {
    const selectedNotes = selectors.getSelectedNotes(getState());

    dispatch(resize(selectedNotes, change));
  };
}

export function removeSelected() {
  return (dispatch, getState) => {
    const selectedNotes = selectors.getSelectedNotes(getState());

    dispatch(remove(selectedNotes));
  };
}

export function selectNote(note, isAdditive) {
  return (dispatch, getState) => {
    const selectedNotes = selectors.getSelectedNotes(getState());

    if (isAdditive) {
      if (_.includes(selectedNotes, note)) {
        dispatch(selectNotes(_.without(selectedNotes, note)));
      } else {
        dispatch(selectNotes([...selectedNotes, note]));
      }
    } else {
      if (!_.includes(selectedNotes, note)) {
        dispatch(selectNotes([note]));
      }
    }
  };
}

export function selectNotes(notes) {
  return (dispatch) => {
    dispatch(setSelectedNoteIds(notes.map(n => n.id)));
  };
}

export function selectAll() {
  return (dispatch, getState) => {
    const notes = selectors.getNotes(getState());

    dispatch(selectNotes(notes));
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
