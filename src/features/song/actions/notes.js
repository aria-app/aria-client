import { NAME } from '../constants';

export const NOTES_ADDED = `${NAME}/NOTES_ADDED`;
export const NOTES_ALL_SELECTED = `${NAME}/NOTES_ALL_SELECTED`;
export const NOTES_DELETED = `${NAME}/NOTES_DELETED`;
export const NOTES_DESELECTED = `${NAME}/NOTES_DESELECTED`;
export const NOTES_DUPLICATED = `${NAME}/NOTES_DUPLICATED`;
export const NOTES_MOVE_STARTED = `${NAME}/NOTES_MOVE_STARTED`;
export const NOTES_MOVE_SUCCEEDED = `${NAME}/NOTES_MOVE_SUCCEEDED`;
export const NOTES_RESIZE_SUCCEEDED = `${NAME}/NOTES_RESIZE_SUCCEEDED`;
export const NOTES_SELECTED = `${NAME}/NOTES_SELECTED`;
export const NOTES_SET = `${NAME}/NOTES_SET`;

export const notesAdded = notes => ({
  type: NOTES_ADDED,
  notes,
});

export const notesAllSelected = () => ({
  type: NOTES_ALL_SELECTED,
});

export const notesDeleted = notes => ({
  type: NOTES_DELETED,
  notes,
});

export const notesDeselected = () => ({
  type: NOTES_DESELECTED,
});

export const notesMoveStarted = (notes, offset) => ({
  type: NOTES_MOVE_STARTED,
  notes,
  offset,
});

export const notesMoveSucceeded = notes => ({
  type: NOTES_MOVE_SUCCEEDED,
  notes,
});

export const notesResizeSucceeded = notes => ({
  type: NOTES_RESIZE_SUCCEEDED,
  notes,
});

export const notesSelected = notes => ({
  type: NOTES_SELECTED,
  notes,
});

export const notesSet = notes => ({
  type: NOTES_SET,
  notes,
});
