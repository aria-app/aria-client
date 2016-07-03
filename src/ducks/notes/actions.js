import * as actionTypes from './action-types';

export const allNotesDeselected = () => ({
  type: actionTypes.ALL_NOTES_DESELECTED,
});

export const allNotesSelected = () => ({
  type: actionTypes.ALL_NOTES_SELECTED,
});

export const noteDrawn = () => ({
  type: actionTypes.NOTE_DRAWN,
});

export const noteErased = (note) => ({
  type: actionTypes.NOTE_ERASED,
  note,
});

export const noteSelected = (note, isAdditive) => ({
  type: actionTypes.NOTE_SELECTED,
  note,
  isAdditive,
});

export const notesDuplicated = () => ({
  type: actionTypes.NOTES_DUPLICATED,
});

export const notesMoved = (notes, offset) => ({
  type: actionTypes.NOTES_MOVED,
  notes,
  offset,
});

export const notesDeleted = (notes) => ({
  type: actionTypes.NOTES_DELETED,
  notes,
});

export const notesResized = (notes, change) => ({
  type: actionTypes.NOTES_RESIZED,
  notes,
  change,
});

export const notesSelected = (notes) => ({
  type: actionTypes.NOTES_SELECTED,
  notes,
});

export const redoPopped = () => ({
  type: actionTypes.REDO_POPPED,
});

export const redoPushed = () => ({
  type: actionTypes.REDO_PUSHED,
});

export const redosSet = (redos) => ({
  type: actionTypes.REDOS_SET,
  redos,
});

export const selectedNotesMoved = (offset) => ({
  type: actionTypes.SELECTED_NOTES_MOVED,
  offset,
});

export const selectedNotesMovedOctaveDown = () => ({
  type: actionTypes.SELECTED_NOTES_MOVED_OCTAVE_DOWN,
});

export const selectedNotesMovedOctaveUp = () => ({
  type: actionTypes.SELECTED_NOTES_MOVED_OCTAVE_UP,
});

export const selectedNotesPositionNudged = (change) => ({
  type: actionTypes.SELECTED_NOTES_POSITION_NUDGED,
  change,
});

export const selectedNotesDeleted = () => ({
  type: actionTypes.SELECTED_NOTES_DELETED,
});

export const selectedNotesResized = (size) => ({
  type: actionTypes.SELECTED_NOTES_RESIZED,
  size,
});

export const selectedNotesSizeChanged = (change) => ({
  type: actionTypes.SELECTED_NOTES_SIZE_CHANGED,
  change,
});

export const selectedNotesSizeNudged = (change) => ({
  type: actionTypes.SELECTED_NOTES_SIZE_NUDGED,
  change,
});

export const undoPopped = () => ({
  type: actionTypes.UNDO_POPPED,
});

export const undoPushed = () => ({
  type: actionTypes.UNDO_PUSHED,
});

export const undosSet = (undos) => ({
  type: actionTypes.UNDOS_SET,
  undos,
});
