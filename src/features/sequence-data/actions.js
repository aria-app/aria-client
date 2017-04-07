import { NAME } from './constants';

export const KEY_PRESSED = `${NAME}/KEY_PRESSED`;
export const NOTE_DRAWN = `${NAME}/NOTE_DRAWN`;
export const NOTE_ERASED = `${NAME}/NOTE_ERASED`;
export const NOTE_SELECTED = `${NAME}/NOTE_SELECTED`;
export const NOTES_DUPLICATED = `${NAME}/NOTES_DUPLICATED`;
export const NOTES_SELECTED_IN_AREA = `${NAME}/NOTES_SELECTED_IN_AREA`;
export const SELECTED_NOTES_DELETED = `${NAME}/SELECTED_NOTES_DELETED`;
export const SELECTED_NOTES_MOVED = `${NAME}/SELECTED_NOTES_MOVED`;
export const SELECTED_NOTES_MOVED_OCTAVE_DOWN = `${NAME}/SELECTED_NOTES_MOVED_OCTAVE_DOWN`;
export const SELECTED_NOTES_MOVED_OCTAVE_UP = `${NAME}/SELECTED_NOTES_MOVED_OCTAVE_UP`;
export const SELECTED_NOTES_RESIZED = `${NAME}/SELECTED_NOTES_RESIZED`;
export const SELECTED_NOTES_SIZE_CHANGED = `${NAME}/SELECTED_NOTES_SIZE_CHANGED`;
export const SEQUENCE_CLOSED = `${NAME}/SEQUENCE_CLOSED`;
export const TOOL_SELECTED = `${NAME}/TOOL_SELECTED`;
export const TOOL_TYPE_SET = `${NAME}/TOOL_TYPE_SET`;

export const keyPressed = key => ({
  type: KEY_PRESSED,
  payload: key,
});

export const noteDrawn = payload => ({
  type: NOTE_DRAWN,
  payload,
});

export const noteErased = note => ({
  type: NOTE_ERASED,
  payload: note,
});

export const noteSelected = (note, isAdditive) => ({
  type: NOTE_SELECTED,
  isAdditive,
  note,
});

export const notesDuplicated = () => ({
  type: NOTES_DUPLICATED,
});

export const notesSelectedInArea = payload => ({
  type: NOTES_SELECTED_IN_AREA,
  payload,
});

export const selectedNotesDeleted = () => ({
  type: SELECTED_NOTES_DELETED,
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

export const selectedNotesResized = size => ({
  type: SELECTED_NOTES_RESIZED,
  size,
});

export const selectedNotesSizeChanged = change => ({
  type: SELECTED_NOTES_SIZE_CHANGED,
  change,
});

export const sequenceClosed = () => ({
  type: SEQUENCE_CLOSED,
});

export const toolSelected = toolType => ({
  type: TOOL_SELECTED,
  toolType,
});

export const toolTypeSet = (toolType, previousToolType) => ({
  type: TOOL_TYPE_SET,
  previousToolType,
  toolType,
});
