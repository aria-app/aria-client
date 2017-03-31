import { NAME } from '../constants';

export const ALL_NOTES_DESELECTED = `${NAME}/ALL_NOTES_DESELECTED`;
export const ALL_NOTES_SELECTED = `${NAME}/ALL_NOTES_SELECTED`;
export const NOTE_DRAWN = `${NAME}/NOTE_DRAWN`;
export const NOTE_ERASED = `${NAME}/NOTE_ERASED`;
export const NOTE_PREVIEWED = `${NAME}/NOTE_PREVIEWED`;
export const NOTE_SELECTED = `${NAME}/NOTE_SELECTED`;
export const NOTES_DUPLICATED = `${NAME}/NOTES_DUPLICATED`;
export const NOTES_MOVED = `${NAME}/NOTES_MOVED`;
export const NOTES_SELECTED_IN_AREA = `${NAME}/NOTES_SELECTED_IN_AREA`;
export const SOME_NOTES_DELETED = `${NAME}/SOME_NOTES_DELETED`;
export const NOTES_RESIZED = `${NAME}/NOTES_RESIZED`;
export const NOTES_SELECTED = `${NAME}/NOTES_SELECTED`;
export const REDO_POPPED = `${NAME}/REDO_POPPED`;
export const REDO_PUSHED = `${NAME}/REDO_PUSHED`;
export const REDOS_SET = `${NAME}/REDOS_SET`;
export const SELECTED_NOTES_MOVED = `${NAME}/SELECTED_NOTES_MOVED`;
export const SELECTED_NOTES_MOVED_OCTAVE_DOWN = `${NAME}/SELECTED_NOTES_MOVED_OCTAVE_DOWN`;
export const SELECTED_NOTES_MOVED_OCTAVE_UP = `${NAME}/SELECTED_NOTES_MOVED_OCTAVE_UP`;
export const SELECTED_NOTES_POSITION_NUDGED = `${NAME}/SELECTED_NOTES_POSITION_NUDGED`;
export const SELECTED_NOTES_DELETED = `${NAME}/SELECTED_NOTES_DELETED`;
export const SELECTED_NOTES_RESIZED = `${NAME}/SELECTED_NOTES_RESIZED`;
export const SELECTED_NOTES_SIZE_CHANGED = `${NAME}/SELECTED_NOTES_SIZE_CHANGED`;
export const SELECTED_NOTES_SIZE_NUDGED = `${NAME}/SELECTED_NOTES_SIZE_NUDGED`;
export const UNDO_POPPED = `${NAME}/UNDO_POPPED`;
export const UNDO_PUSHED = `${NAME}/UNDO_PUSHED`;
export const UNDOS_SET = `${NAME}/UNDOS_SET`;

export const allNotesDeselected = () => ({
  type: ALL_NOTES_DESELECTED,
});

export const allNotesSelected = () => ({
  type: ALL_NOTES_SELECTED,
});

export const noteDrawn = point => ({
  type: NOTE_DRAWN,
  point,
});

export const noteErased = note => ({
  type: NOTE_ERASED,
  note,
});

export const notePreviewed = point => ({
  type: NOTE_PREVIEWED,
  payload: point,
});

export const noteSelected = (note, isAdditive) => ({
  type: NOTE_SELECTED,
  note,
  isAdditive,
});

export const notesDuplicated = () => ({
  type: NOTES_DUPLICATED,
});

export const notesMoved = (notes, offset) => ({
  type: NOTES_MOVED,
  notes,
  offset,
});

export const notesSelectedInArea = payload => ({
  type: NOTES_SELECTED_IN_AREA,
  payload,
});

export const someNotesDeleted = notes => ({
  type: SOME_NOTES_DELETED,
  notes,
});

export const notesResized = (notes, change) => ({
  type: NOTES_RESIZED,
  notes,
  change,
});

export const notesSelected = notes => ({
  type: NOTES_SELECTED,
  notes,
});

export const redoPopped = () => ({
  type: REDO_POPPED,
});

export const redoPushed = () => ({
  type: REDO_PUSHED,
});

export const redosSet = redos => ({
  type: REDOS_SET,
  redos,
});

export const selectedNotesMoved = offset => ({
  type: SELECTED_NOTES_MOVED,
  offset,
});

export const selectedNotesMovedOctaveDown = () => ({
  type: SELECTED_NOTES_MOVED_OCTAVE_DOWN,
});

export const selectedNotesMovedOctaveUp = () => ({
  type: SELECTED_NOTES_MOVED_OCTAVE_UP,
});

export const selectedNotesPositionNudged = change => ({
  type: SELECTED_NOTES_POSITION_NUDGED,
  change,
});

export const selectedNotesDeleted = () => ({
  type: SELECTED_NOTES_DELETED,
});

export const selectedNotesResized = size => ({
  type: SELECTED_NOTES_RESIZED,
  size,
});

export const selectedNotesSizeChanged = change => ({
  type: SELECTED_NOTES_SIZE_CHANGED,
  change,
});

export const selectedNotesSizeNudged = change => ({
  type: SELECTED_NOTES_SIZE_NUDGED,
  change,
});

export const undoPopped = () => ({
  type: UNDO_POPPED,
});

export const undoPushed = () => ({
  type: UNDO_PUSHED,
});

export const undosSet = undos => ({
  type: UNDOS_SET,
  undos,
});
