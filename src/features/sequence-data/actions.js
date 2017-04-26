import { NAME } from './constants';

export const KEY_PRESSED = `${NAME}/KEY_PRESSED`;
export const NOTE_DRAWN = `${NAME}/NOTE_DRAWN`;
export const NOTE_ERASED = `${NAME}/NOTE_ERASED`;
export const NOTE_SELECTED = `${NAME}/NOTE_SELECTED`;
export const NOTES_ALL_DESELECTED = `${NAME}/NOTES_ALL_DESELECTED`;
export const NOTES_ALL_SELECTED = `${NAME}/NOTES_ALL_SELECTED`;
export const NOTES_DRAGGED = `${NAME}/NOTES_DRAGGED`;
export const NOTES_DUPLICATED = `${NAME}/NOTES_DUPLICATED`;
export const NOTES_MOVED_OCTAVE_DOWN = `${NAME}/NOTES_MOVED_OCTAVE_DOWN`;
export const NOTES_MOVED_OCTAVE_UP = `${NAME}/NOTES_MOVED_OCTAVE_UP`;
export const NOTES_NUDGED = `${NAME}/NOTES_NUDGED`;
export const NOTES_RESIZED = `${NAME}/NOTES_RESIZED`;
export const NOTES_SELECTED_IN_AREA = `${NAME}/NOTES_SELECTED_IN_AREA`;
export const NOTES_DELETED = `${NAME}/NOTES_DELETED`;
export const SEQUENCE_CLOSED = `${NAME}/SEQUENCE_CLOSED`;
export const TOOL_SELECTED = `${NAME}/TOOL_SELECTED`;
export const TOOL_TYPE_SET = `${NAME}/TOOL_TYPE_SET`;

export const keyPressed = payload => ({
  type: KEY_PRESSED,
  payload,
});

export const noteDrawn = payload => ({
  type: NOTE_DRAWN,
  payload,
});

export const noteErased = payload => ({
  type: NOTE_ERASED,
  payload,
});

export const noteSelected = payload => ({
  type: NOTE_SELECTED,
  payload,
});

export const notesAllDeselected = () => ({
  type: NOTES_ALL_DESELECTED,
});

export const notesAllSelected = ({ ids }) => ({
  type: NOTES_ALL_SELECTED,
  ids,
});

export const notesDeleted = payload => ({
  type: NOTES_DELETED,
  payload,
});

export const notesDragged = payload => ({
  type: NOTES_DRAGGED,
  payload,
});

export const notesDuplicated = ({ notes }) => ({
  type: NOTES_DUPLICATED,
  notes,
});

export const notesMovedOctaveDown = payload => ({
  type: NOTES_MOVED_OCTAVE_DOWN,
  payload,
});

export const notesMovedOctaveUp = payload => ({
  type: NOTES_MOVED_OCTAVE_UP,
  payload,
});

export const notesNudged = ({ delta, ids }) => ({
  type: NOTES_NUDGED,
  delta,
  ids,
});

export const notesResized = payload => ({
  type: NOTES_RESIZED,
  payload,
});

export const notesSelectedInArea = payload => ({
  type: NOTES_SELECTED_IN_AREA,
  payload,
});

export const sequenceClosed = () => ({
  type: SEQUENCE_CLOSED,
});

export const toolSelected = payload => ({
  type: TOOL_SELECTED,
  payload,
});

export const toolTypeSet = payload => ({
  type: TOOL_TYPE_SET,
  payload,
});
