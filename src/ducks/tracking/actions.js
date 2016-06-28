import * as actionTypes from './action-types';

export const newTrackAdded = () => ({
  type: actionTypes.NEW_TRACK_ADDED,
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

export const sequenceAddedToTrack = (track, position) => ({
  type: actionTypes.SEQUENCE_ADDED_TO_TRACK,
  track,
  position,
});

export const sequenceDeleted = (sequence) => ({
  type: actionTypes.SEQUENCE_DELETED,
  sequence,
});

export const sequenceDeselected = () => ({
  type: actionTypes.SEQUENCE_DESELECTED,
});

export const sequenceExtended = (sequence) => ({
  type: actionTypes.SEQUENCE_EXTENDED,
  sequence,
});

export const sequenceNudgedLeft = (sequence) => ({
  type: actionTypes.SEQUENCE_NUDGED_LEFT,
  sequence,
});

export const sequenceNudgedRight = (sequence) => ({
  type: actionTypes.SEQUENCE_NUDGED_RIGHT,
  sequence,
});

export const sequenceSelected = (id) => ({
  type: actionTypes.SEQUENCE_SELECTED,
  id,
});

export const sequenceShortened = (sequence) => ({
  type: actionTypes.SEQUENCE_SHORTENED,
  sequence,
});

export const trackEditingFinished = () => ({
  type: actionTypes.TRACK_EDITING_FINISHED,
});

export const trackEditingStarted = (id) => ({
  type: actionTypes.TRACK_EDITING_STARTED,
  id,
});

export const trackIsMutedToggled = (id) => ({
  type: actionTypes.TRACK_IS_MUTED_TOGGLED,
  id,
});

export const trackIsSoloingToggled = (id) => ({
  type: actionTypes.TRACK_IS_SOLOING_TOGGLED,
  id,
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
