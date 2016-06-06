import _ from 'lodash';
import sequencer from 'ducks/sequencer';
import song from 'ducks/song';
import playing from 'ducks/playing';
import * as actionTypes from './action-types';
import * as helpers from './helpers';
import * as selectors from './selectors';

export function changeSelectedSize(change) {
  return () => (dispatch, getState) => {
    const selectedNotes = selectors.getSelectedNotes(getState());

    dispatch(pushUndo());
    dispatch(resize(selectedNotes, change));
  };
}

export function deselectAll() {
  return {
    type: actionTypes.DESELECT_ALL,
  };
}

export function draw() {
  return (dispatch, getState) => {
    const activeSequenceId = song.selectors.getActiveSequenceId(getState());
    const point = sequencer.selectors.getMousePoint(getState());

    dispatch(playing.actions.previewNote(point));
    dispatch(song.actions.addNote(song.helpers.createNote({
      points: [point, { x: point.x + 1, y: point.y }],
      sequenceId: activeSequenceId,
    })));
  };
}

export function duplicate() {
  return (dispatch, getState) => {
    const selectedNotes = selectors.getSelectedNotes(getState());

    if (_.isEmpty(selectedNotes)) return;

    const newNotes = selectedNotes.map(note => song.helpers.createNote({
      points: note.points,
      sequenceId: note.sequenceId,
    }));

    dispatch(pushUndo());
    dispatch(song.actions.addNotes(newNotes));
    dispatch(selectNotes(newNotes));
  };
}

export function erase(note) {
  return (dispatch) => {
    dispatch(remove([note]));
  };
}

export function move(notes, offset) {
  return (dispatch, getState) => {
    const measureCount = song.selectors.getActiveSequenceMeasureCount(getState());

    const updatedNotes = notes.map(note => ({
      ...note,
      points: note.points.map(point => helpers.addPoints(point, offset)),
    }));

    if (helpers.somePointOutside(_.map(updatedNotes, n => n.points[0]), measureCount)
      || helpers.somePointOutside(_.map(updatedNotes, n => n.points[1]), measureCount)) return;

    dispatch(playing.actions.previewNote(_.first(updatedNotes[0].points)));
    dispatch(song.actions.updateNotes(updatedNotes));
  };
}

export function moveSelected(offset) {
  return (dispatch, getState) => {
    const selectedNotes = selectors.getSelectedNotes(getState());

    if (_.isEmpty(selectedNotes)) return;

    dispatch(move(selectedNotes, offset));
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
    const allNotes = song.selectors.getActiveSequenceNotes(getState());
    const redos = selectors.getRedos(getState());

    dispatch(setRedos([
      ...redos,
      allNotes,
    ]));
  };
}

export function pushUndo() {
  return (dispatch, getState) => {
    const allNotes = song.selectors.getActiveSequenceNotes(getState());
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

    const allNotes = song.selectors.getActiveSequenceNotes(getState());
    const undos = selectors.getUndos(getState());

    dispatch(setUndos([
      ...undos,
      allNotes,
    ]));
    dispatch(song.actions.setNotes(_.last(redos)));
    dispatch(setRedos(redos.slice(0, redos.length - 1)));
  };
}

export function remove(notes) {
  return (dispatch) => {
    dispatch(pushUndo());
    dispatch(song.actions.deleteNotes(notes));
  };
}

export function removeSelected() {
  return (dispatch, getState) => {
    const selectedNotes = selectors.getSelectedNotes(getState());
    dispatch(remove(selectedNotes));
  };
}

export function resize(notes, change) {
  return (dispatch, getState) => {
    const measureCount = song.selectors.getActiveSequenceMeasureCount(getState());
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

    const updatedNotes = notes
      .map(note => ({
        ...note,
        points: [
          ...note.points.slice(0, note.points.length - 1),
          helpers.addPoints(_.last(note.points), change),
        ],
      }));

    if (helpers.somePointOutside(_.map(updatedNotes, n => n.points[1]), measureCount)) return;

    dispatch(playing.actions.previewNote(_.last(updatedNotes[0].points)));

    dispatch(song.actions.updateNotes(updatedNotes));
  };
}

export function resizeSelected(size) {
  return () => (dispatch, getState) => {
    const selectedNotes = selectors.getSelectedNotes(getState());
    const updatedNotes = selectedNotes.map(note => ({
      ...note,
      points: [
        ...note.points.slice(0, note.points.length - 1),
        {
          x: _.first(note.points).x + size - 1,
          y: _.first(note.points).y,
        },
      ],
    }));

    dispatch(pushUndo());
    dispatch(song.actions.updateNotes(updatedNotes));
  };
}

export function selectNote(note, isAdditive) {
  return {
    type: actionTypes.SELECT_NOTE,
    note,
    isAdditive,
  };
}

export function selectNotes(notes) {
  return {
    type: actionTypes.SELECT_NOTES,
    notes,
  };
}

export function selectAll() {
  return (dispatch, getState) => {
    const notes = song.selectors.getActiveSequenceNotes(getState());
    dispatch(selectNotes(notes));
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
    dispatch(song.actions.setNotes(_.last(undos)));
    dispatch(setUndos(undos.slice(0, undos.length - 1)));
  };
}
