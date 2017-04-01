import { NAME } from '../constants';

export const SELECTED_NOTES_MOVED = `${NAME}/SELECTED_NOTES_MOVED`;
export const SELECTED_NOTES_MOVED_OCTAVE_DOWN = `${NAME}/SELECTED_NOTES_MOVED_OCTAVE_DOWN`;
export const SELECTED_NOTES_MOVED_OCTAVE_UP = `${NAME}/SELECTED_NOTES_MOVED_OCTAVE_UP`;
export const SELECTED_NOTES_POSITION_NUDGED = `${NAME}/SELECTED_NOTES_POSITION_NUDGED`;
export const SELECTED_NOTES_DELETED = `${NAME}/SELECTED_NOTES_DELETED`;
export const SELECTED_NOTES_RESIZED = `${NAME}/SELECTED_NOTES_RESIZED`;
export const SELECTED_NOTES_SIZE_CHANGED = `${NAME}/SELECTED_NOTES_SIZE_CHANGED`;
export const SELECTED_NOTES_SIZE_NUDGED = `${NAME}/SELECTED_NOTES_SIZE_NUDGED`;

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
