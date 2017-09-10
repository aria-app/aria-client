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

export const keyPressed = ({ pitch, trackId }) => ({
  type: KEY_PRESSED,
  payload: {
    pitch,
    trackId,
  },
});

export const noteDrawn = ({ note }) => ({
  type: NOTE_DRAWN,
  note,
});

export const noteErased = ({ note }) => ({
  type: NOTE_ERASED,
  note,
});

export const noteSelected = ({ isAdditive, note }) => ({
  type: NOTE_SELECTED,
  isAdditive,
  note,
});

export const notesAllDeselected = () => ({
  type: NOTES_ALL_DESELECTED,
});

export const notesAllSelected = ({ notes }) => ({
  type: NOTES_ALL_SELECTED,
  notes,
});

export const notesDeleted = ({ notes }) => ({
  type: NOTES_DELETED,
  notes,
});

export const notesDragged = ({ notes }) => ({
  type: NOTES_DRAGGED,
  notes,
});

export const notesDuplicated = ({ notes }) => ({
  type: NOTES_DUPLICATED,
  notes,
});

export const notesMovedOctaveDown = ({ notes }) => ({
  type: NOTES_MOVED_OCTAVE_DOWN,
  notes,
});

export const notesMovedOctaveUp = ({ notes }) => ({
  type: NOTES_MOVED_OCTAVE_UP,
  notes,
});

export const notesNudged = ({ delta, notes }) => ({
  type: NOTES_NUDGED,
  delta,
  notes,
});

export const notesResized = ({ notes }) => ({
  type: NOTES_RESIZED,
  notes,
});

export const notesSelectedInArea = ({
  endPoint,
  isAdditive,
  notes,
  selectedNotes,
  startPoint,
}) => ({
  type: NOTES_SELECTED_IN_AREA,
  endPoint,
  isAdditive,
  notes,
  selectedNotes,
  startPoint,
});

export const sequenceClosed = () => ({
  type: SEQUENCE_CLOSED,
});

export const toolSelected = ({ previousToolType, toolType }) => ({
  type: TOOL_SELECTED,
  previousToolType,
  toolType,
});
