import _ from 'lodash';
import sequence from 'modules/sequence';
import sound from 'modules/sound';
import actionTypes from './action-types';
import * as helpers from './helpers';
import selectors from './selectors';

export function add(newNotes) {
  return (dispatch, getState) => {
    const oldNotes = selectors.getNotes(getState());

    dispatch(setNotesWithUndo([
      ...oldNotes,
      ...newNotes,
    ]));
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

    if (helpers.somePointWillMoveOutside(notes, offset, measureCount)) return;

    const updatedNotes = notes.map(note => helpers.createNote({
      id: note.id,
      position: helpers.addPositions(note.position, offset),
      endPosition: helpers.addPositions(note.endPosition, offset),
    }));

    dispatch(sound.actions.playNote(updatedNotes[0].name));
    dispatch(update(updatedNotes));
  };
}

export function paste() {
  return (dispatch, getState) => {

  };
}

export function popNoteRedos() {
  return (dispatch, getState) => {
    const noteRedos = selectors.getNoteRedos(getState());

    if (_.isEmpty(noteRedos)) return;

    dispatch(pushNoteUndos());
    dispatch(setNotes(_.last(noteRedos)));
    dispatch(setNoteRedos(noteRedos.slice(0, noteRedos.length - 1)));
  };
}

export function popNoteUndos() {
  return (dispatch, getState) => {
    const noteUndos = selectors.getNoteUndos(getState());

    if (_.isEmpty(noteUndos)) return;

    dispatch(pushNoteRedos());
    dispatch(setNotes(_.last(noteUndos)));
    dispatch(setNoteUndos(noteUndos.slice(0, noteUndos.length - 1)));
  };
}

export function pushNoteRedos() {
  return (dispatch, getState) => {
    const allNotes = selectors.getNotes(getState());
    const noteRedos = selectors.getNoteRedos(getState());

    dispatch(setNoteRedos([
      ...noteRedos,
      allNotes,
    ]));
  };
}

export function pushNoteUndos() {
  return (dispatch, getState) => {
    const allNotes = selectors.getNotes(getState());
    const noteUndos = selectors.getNoteUndos(getState());

    dispatch(setNoteUndos([
      ...noteUndos,
      allNotes,
    ]));
  };
}

export function remove(notesToRemove) {
  return (dispatch, getState) => {
    const notes = selectors.getNotes(getState());

    dispatch(setNotesWithUndo(_.difference(notes, notesToRemove)));
  };
}

export function resize(notes, change) {
  return (dispatch, getState) => {
    const measureCount = sequence.selectors.getMeasureCount(getState());
    const movingLeft = change.x < 0;
    const anyNoteBent = _.some(notes, n => (n.endPosition.y - n.position.y) !== 0);
    const willBeMinLength = _.some(notes, n => (n.endPosition.x - n.position.x) <= 1);
    const willBeNegative = _.some(notes, n => (n.endPosition.x - n.position.x) <= 0);

    if (movingLeft && anyNoteBent && willBeMinLength) {
      return;
    }

    if (movingLeft && willBeNegative) {
      return;
    }

    if (change.y !== 0 && _.some(notes, n => (n.endPosition.x - n.position.x) === 0)) {
      return;
    }

    if (helpers.somePointWillMoveOutside(notes, change, measureCount)) return;

    const updatedNotes = notes.map(note => helpers.createNote({
      endPosition: helpers.addPositions(note.endPosition, change),
      id: note.id,
      position: note.position,
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

export function setNotesWithUndo(notes) {
  return dispatch => {
    dispatch(pushNoteUndos());
    dispatch(setNoteRedos([]));
    dispatch(setNotes(notes));
  };
}

function setNotes(notes) {
  return {
    type: actionTypes.SET_NOTES,
    notes,
  };
}

export function setNoteRedos(noteRedos) {
  return {
    type: actionTypes.SET_NOTE_REDOS,
    noteRedos,
  };
}

export function setNoteUndos(noteUndos) {
  return {
    type: actionTypes.SET_NOTE_UNDOS,
    noteUndos,
  };
}

export function setSelectedNoteIds(selectedNoteIds) {
  return {
    type: actionTypes.SET_SELECTED_NOTE_IDS,
    selectedNoteIds,
  };
}

export function setSelectedNoteSizes(size) {
  return () => (dispatch, getState) => {
    const selectedNotes = selectors.getSelectedNotes(getState());

    const updatedNotes = selectedNotes.map(note => helpers.createNote({
      id: note.id,
      position: note.position,
      endPosition: {
        x: note.position.x + size,
        y: note.position.y,
      },
    }));

    dispatch(update(updatedNotes));
  };
}

export function update(items) {
  return (dispatch, getState) => {
    const allNotes = selectors.getNotes(getState());

    dispatch(setNotesWithUndo(replaceItemsById(allNotes, items)));
  };
}

function replaceItemsById(list, items) {
  return list.map(i => {
    const newItem = _.find(items, { id: i.id });
    return newItem || i;
  });
}
