import { NAME } from './constants';

export const TRACK_CREATED_AND_ADDED = `${NAME}/TRACK_CREATED_AND_ADDED`;
export const REDO_POPPED = `${NAME}/REDO_POPPED`;
export const REDO_PUSHED = `${NAME}/PUSH_REDO`;
export const REDOS_SET = `${NAME}/REDOS_SET`;
export const SELECTED_SEQUENCE_DELETED = `${NAME}/SELECTED_SEQUENCE_DELETED`;
export const SELECTED_SEQUENCE_EXTENDED = `${NAME}/SELECTED_SEQUENCE_EXTENDED`;
export const SELECTED_SEQUENCE_NUDGED_LEFT = `${NAME}/SELECTED_SEQUENCE_NUDGED_LEFT`;
export const SELECTED_SEQUENCE_NUDGED_RIGHT = `${NAME}/SELECTED_SEQUENCE_NUDGED_RIGHT`;
export const SELECTED_SEQUENCE_OPENED = `${NAME}/SELECTED_SEQUENCE_OPENED`;
export const SELECTED_SEQUENCE_SHORTENED = `${NAME}/SELECTED_SEQUENCE_SHORTENED`;
export const SEQUENCE_ADDED_TO_TRACK = `${NAME}/SEQUENCE_ADDED_TO_TRACK`;
export const SEQUENCE_DESELECTED = `${NAME}/SEQUENCE_DESELECTED`;
export const SEQUENCE_SELECTED = `${NAME}/SEQUENCE_SELECTED`;
export const SONG_EXTENDED = `${NAME}/SONG_EXTENDED`;
export const SONG_SHORTENED = `${NAME}/SONG_SHORTENED`;
export const TRACK_EDITING_FINISHED = `${NAME}/TRACK_EDITING_FINISHED`;
export const TRACK_EDITING_STARTED = `${NAME}/TRACK_EDITING_STARTED`;
export const TRACK_IS_MUTED_TOGGLED = `${NAME}/TRACK_IS_MUTED_TOGGLED`;
export const TRACK_IS_SOLOING_TOGGLED = `${NAME}/TRACK_IS_SOLOING_TOGGLED`;
export const UNDO_POPPED = `${NAME}/UNDO_POPPED`;
export const UNDO_PUSHED = `${NAME}/UNDO_PUSHED`;
export const UNDOS_SET = `${NAME}/UNDOS_SET`;

export const redoPopped = () => ({
  type: REDO_POPPED,
});

export const redoPushed = () => ({
  type: REDO_PUSHED,
});

export const redosSet = (redos) => ({
  type: REDOS_SET,
  redos,
});

export const selectedSequenceDeleted = (id) => ({
  type: SELECTED_SEQUENCE_DELETED,
  id,
});

export const selectedSequenceExtended = (id) => ({
  type: SELECTED_SEQUENCE_EXTENDED,
  id,
});

export const selectedSequenceNudgedLeft = (id) => ({
  type: SELECTED_SEQUENCE_NUDGED_LEFT,
  id,
});

export const selectedSequenceNudgedRight = (id) => ({
  type: SELECTED_SEQUENCE_NUDGED_RIGHT,
  id,
});

export const selectedSequenceOpened = (id) => ({
  type: SELECTED_SEQUENCE_OPENED,
  id,
});

export const selectedSequenceShortened = (id) => ({
  type: SELECTED_SEQUENCE_SHORTENED,
  id,
});

export const sequenceAddedToTrack = (id, position) => ({
  type: SEQUENCE_ADDED_TO_TRACK,
  id,
  position,
});

export const sequenceDeselected = () => ({
  type: SEQUENCE_DESELECTED,
});

export const sequenceSelected = (id) => ({
  type: SEQUENCE_SELECTED,
  id,
});

export const songExtended = () => ({
  type: SONG_EXTENDED,
});

export const songShortened = () => ({
  type: SONG_SHORTENED,
});

export const trackCreatedAndAdded = () => ({
  type: TRACK_CREATED_AND_ADDED,
});

export const trackEditingFinished = () => ({
  type: TRACK_EDITING_FINISHED,
});

export const trackEditingStarted = (id) => ({
  type: TRACK_EDITING_STARTED,
  id,
});

export const trackIsMutedToggled = (id) => ({
  type: TRACK_IS_MUTED_TOGGLED,
  id,
});

export const trackIsSoloingToggled = (id) => ({
  type: TRACK_IS_SOLOING_TOGGLED,
  id,
});

export const undoPopped = () => ({
  type: UNDO_POPPED,
});

export const undoPushed = () => ({
  type: UNDO_PUSHED,
});

export const undosSet = (undos) => ({
  type: UNDOS_SET,
  undos,
});
