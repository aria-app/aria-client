import { NAME } from '../constants';

export const NOTE_DRAWN = `${NAME}/NOTE_DRAWN`;
export const NOTE_ERASED = `${NAME}/NOTE_ERASED`;
export const NOTE_SELECTED = `${NAME}/NOTE_SELECTED`;
export const NOTES_ADDED = `${NAME}/NOTES_ADDED`;
export const NOTES_ALL_SELECTED = `${NAME}/NOTES_ALL_SELECTED`;
export const NOTES_DESELECTED = `${NAME}/NOTES_DESELECTED`;
export const NOTES_DUPLICATED = `${NAME}/NOTES_DUPLICATED`;
export const NOTES_MOVE_COMMITTED = `${NAME}/NOTES_MOVE_COMMITTED`;
export const NOTES_MOVED = `${NAME}/NOTES_MOVED`;
export const NOTES_SELECTED_IN_AREA = `${NAME}/NOTES_SELECTED_IN_AREA`;
export const NOTES_DELETE_COMMITTED = `${NAME}/NOTES_DELETE_COMMITTED`;
export const NOTES_DELETED = `${NAME}/NOTES_DELETED`;
export const NOTES_RESIZE_COMMITTED = `${NAME}/NOTES_RESIZE_COMMITTED`;
export const NOTES_RESIZED = `${NAME}/NOTES_RESIZED`;
export const NOTES_SELECTED = `${NAME}/NOTES_SELECTED`;
export const NOTES_SET = `${NAME}/NOTES_SET`;

export const noteDrawn = payload => ({
  type: NOTE_DRAWN,
  payload,
});

export const noteErased = note => ({
  type: NOTE_ERASED,
  note,
});

export const noteSelected = (note, isAdditive) => ({
  type: NOTE_SELECTED,
  note,
  isAdditive,
});

export const notesAdded = notes => ({
  type: NOTES_ADDED,
  notes,
});

export const notesAllSelected = () => ({
  type: NOTES_ALL_SELECTED,
});

export const notesDeleteCommitted = notes => ({
  type: NOTES_DELETE_COMMITTED,
  notes,
});

export const notesDeselected = () => ({
  type: NOTES_DESELECTED,
});

export const notesDuplicated = () => ({
  type: NOTES_DUPLICATED,
});

export const notesMoveCommitted = notes => ({
  type: NOTES_MOVE_COMMITTED,
  notes,
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

export const notesDeleted = notes => ({
  type: NOTES_DELETED,
  notes,
});

export const notesResizeCommitted = notes => ({
  type: NOTES_RESIZE_COMMITTED,
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

export const notesSet = notes => ({
  type: NOTES_SET,
  notes,
});
