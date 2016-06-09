import * as actionTypes from './action-types';

export const deselectAll = () => ({
  type: actionTypes.DESELECT_ALL,
});

export const draw = () => ({
  type: actionTypes.DRAW,
});

export const duplicate = () => ({
  type: actionTypes.DUPLICATE,
});

export const erase = (note) => ({
  type: actionTypes.ERASE,
  note,
});

export const move = (notes, offset) => ({
  type: actionTypes.MOVE,
  notes,
  offset,
});

export const moveSelected = (offset) => ({
  type: actionTypes.MOVE_SELECTED,
  offset,
});

export const nudgeSelectedNotesPosition = (change) => () => ({
  type: actionTypes.NUDGE_SELECTED_NOTES_POSITION,
  change,
});

export const nudgeSelectedNotesSize = (change) => () => ({
  type: actionTypes.NUDGE_SELECTED_NOTES_SIZE,
  change,
});

export const pushRedo = () => ({
  type: actionTypes.PUSH_REDO,
});

export const pushUndo = () => ({
  type: actionTypes.PUSH_UNDO,
});

export const redo = () => ({
  type: actionTypes.REDO,
});

export const remove = (notes) => ({
  type: actionTypes.REMOVE,
  notes,
});

export const removeSelected = () => ({
  type: actionTypes.REMOVE_SELECTED,
});

export const resize = (notes, change) => ({
  type: actionTypes.RESIZE,
  notes,
  change,
});

export const resizeSelected = (size) => ({
  type: actionTypes.RESIZE_SELECTED,
  size,
});

export const selectAll = () => ({
  type: actionTypes.SELECT_ALL,
});

export const selectNote = (note, isAdditive) => ({
  type: actionTypes.SELECT_NOTE,
  note,
  isAdditive,
});

export const selectNotes = (notes) => ({
  type: actionTypes.SELECT_NOTES,
  notes,
});

export const setRedos = (redos) => ({
  type: actionTypes.SET_REDOS,
  redos,
});

export const setUndos = (undos) => ({
  type: actionTypes.SET_UNDOS,
  undos,
});

export const shiftDownOctave = () => ({
  type: actionTypes.SHIFT_DOWN_OCTAVE,
});

export const shiftUpOctave = () => ({
  type: actionTypes.SHIFT_UP_OCTAVE,
});

export const undo = () => ({
  type: actionTypes.UNDO,
});
