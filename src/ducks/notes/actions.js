import _ from 'lodash';
import sequence from 'ducks/sequence';
import sound from 'ducks/sound';
import actionTypes from './action-types';
import * as helpers from './helpers';
import * as selectors from './selectors';

export function add(newNotes) {
  return (dispatch, getState) => {
    const oldNotes = selectors.getNotes(getState());

    dispatch(pushUndo());
    dispatch(setNotes([
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

export function draw() {
  return (dispatch, getState) => {
    const point = sequence.selectors.getMousePoint(getState());
    const note = helpers.createNote({
      points: [
        point,
        {
          x: point.x + 1,
          y: point.y,
        },
      ],
    });

    dispatch(sound.actions.playNote(_.first(note.points)));
    dispatch(add([note]));
  };
}

export function duplicate() {
  return (dispatch, getState) => {
    const selectedNotes = selectors.getSelectedNotes(getState());

    if (_.isEmpty(selectedNotes)) return;

    const duplicatedNotes = selectedNotes.map(note => helpers.createNote({
      points: note.points,
    }));

    dispatch(pushUndo());
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

    const updatedNotes = notes.map(note => helpers.createNote({
      id: note.id,
      points: note.points.map(point => helpers.addPoints(point, offset)),
    }));

    if (helpers.somePointOutside(_.map(updatedNotes, n => n.points[0]), measureCount)
      || helpers.somePointOutside(_.map(updatedNotes, n => n.points[1]), measureCount)) return;

    dispatch(sound.actions.playNote(_.first(updatedNotes[0].points)));
    dispatch(update(updatedNotes));
  };
}

export function nudgeSelectedNotes(offset) {
  return () => (dispatch, getState) => {
    const selectedNotes = selectors.getSelectedNotes(getState());

    if (_.isEmpty(selectedNotes)) return;

    dispatch(pushUndo());
    dispatch(move(selectedNotes, offset));
  };
}

export function pushRedo() {
  return (dispatch, getState) => {
    const allNotes = selectors.getNotes(getState());
    const redos = selectors.getRedos(getState());

    dispatch(setRedos([
      ...redos,
      allNotes,
    ]));
  };
}

export function pushUndo() {
  return (dispatch, getState) => {
    const allNotes = selectors.getNotes(getState());
    const undos = selectors.getUndos(getState());

    if (_.isEqual(_.last(undos), allNotes)) return;

    dispatch(setUndos([
      ...undos,
      allNotes,
    ]));
    dispatch(setRedos([]));
  };
}

export function redo() {
  return (dispatch, getState) => {
    const redos = selectors.getRedos(getState());

    if (_.isEmpty(redos)) return;

    const allNotes = selectors.getNotes(getState());
    const undos = selectors.getUndos(getState());

    dispatch(setUndos([
      ...undos,
      allNotes,
    ]));
    dispatch(setNotes(_.last(redos)));
    dispatch(setRedos(redos.slice(0, redos.length - 1)));
  };
}

export function remove(notesToRemove) {
  return (dispatch, getState) => {
    const notes = selectors.getNotes(getState());

    dispatch(pushUndo());
    dispatch(setSelectedNoteIds([]));
    dispatch(setNotes(_.difference(notes, notesToRemove)));
  };
}

export function resize(notes, change) {
  return (dispatch, getState) => {
    const measureCount = sequence.selectors.getMeasureCount(getState());
    const movingLeft = change.x < 0;
    const anyNoteBent = _.some(notes, n => (_.last(n.points).y - _.first(n.points).y) !== 0);
    const willBeMinLength = _.some(notes, n => (_.last(n.points).x - _.first(n.points).x) <= 1);
    const willBeNegative = _.some(notes, n => (_.last(n.points).x - _.first(n.points).x) <= 0);

    if (movingLeft && anyNoteBent && willBeMinLength) {
      return;
    }

    if (movingLeft && willBeNegative) {
      return;
    }

    if (change.y !== 0 && _.some(notes, n => (_.last(n.points).x - _.first(n.points).x) === 0)) {
      return;
    }

    const updatedNotes = notes.map(note => helpers.createNote({
      id: note.id,
      points: [
        ...note.points.slice(0, note.points.length - 1),
        helpers.addPoints(_.last(note.points), change),
      ],
    }));

    if (helpers.somePointOutside(_.map(updatedNotes, n => n.points[1]), measureCount)) return;

    dispatch(sound.actions.playNote(_.last(updatedNotes[0].points)));

    dispatch(update(updatedNotes));
  };
}

export function resizeSelected(change) {
  return () => (dispatch, getState) => {
    const selectedNotes = selectors.getSelectedNotes(getState());

    dispatch(pushUndo());
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

export function setNotes(notes) {
  return {
    type: actionTypes.SET_NOTES,
    notes,
  };
}

export function setRedos(redos) {
  return {
    type: actionTypes.SET_REDOS,
    redos,
  };
}

export function setUndos(undos) {
  return {
    type: actionTypes.SET_UNDOS,
    undos,
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
      points: [
        ...note.points.slice(0, note.points.length - 1),
        {
          x: _.first(note.points).x + size - 1,
          y: _.first(note.points).y,
        },
      ],
    }));

    dispatch(pushUndo());
    dispatch(update(updatedNotes));
  };
}

export function shiftDownOctave() {
  return (dispatch, getState) => {
    const selectedNotes = selectors.getSelectedNotes(getState());

    dispatch(move(selectedNotes, {
      x: 0,
      y: 12,
    }));
  };
}

export function shiftUpOctave() {
  return (dispatch, getState) => {
    const selectedNotes = selectors.getSelectedNotes(getState());

    dispatch(move(selectedNotes, {
      x: 0,
      y: -12,
    }));
  };
}

export function undo() {
  return (dispatch, getState) => {
    const undos = selectors.getUndos(getState());

    if (_.isEmpty(undos)) return;

    dispatch(pushRedo());
    dispatch(setNotes(_.last(undos)));
    dispatch(setUndos(undos.slice(0, undos.length - 1)));
  };
}

export function update(items) {
  return (dispatch, getState) => {
    const allNotes = selectors.getNotes(getState());

    dispatch(setNotes(replaceItemsById(allNotes, items)));
  };
}

function replaceItemsById(list, items) {
  return list.map(i => {
    const newItem = _.find(items, { id: i.id });
    return newItem || i;
  });
}
