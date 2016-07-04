import * as actionTypes from './action-types';

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

export const selectedSequenceDeleted = (id) => ({
  type: actionTypes.SELECTED_SEQUENCE_DELETED,
  id,
});

export const selectedSequenceExtended = (id) => ({
  type: actionTypes.SELECTED_SEQUENCE_EXTENDED,
  id,
});

export const selectedSequenceNudgedLeft = (id) => ({
  type: actionTypes.SELECTED_SEQUENCE_NUDGED_LEFT,
  id,
});

export const selectedSequenceNudgedRight = (id) => ({
  type: actionTypes.SELECTED_SEQUENCE_NUDGED_RIGHT,
  id,
});

export const selectedSequenceOpened = (id) => ({
  type: actionTypes.SELECTED_SEQUENCE_OPENED,
  id,
});

export const selectedSequenceShortened = (id) => ({
  type: actionTypes.SELECTED_SEQUENCE_SHORTENED,
  id,
});

export const sequenceAddedToTrack = (id, position) => ({
  type: actionTypes.SEQUENCE_ADDED_TO_TRACK,
  id,
  position,
});

export const sequenceDeselected = () => ({
  type: actionTypes.SEQUENCE_DESELECTED,
});

export const sequenceSelected = (id) => ({
  type: actionTypes.SEQUENCE_SELECTED,
  id,
});

export const songExtended = () => ({
  type: actionTypes.SONG_EXTENDED,
});

export const songShortened = () => ({
  type: actionTypes.SONG_SHORTENED,
});

export const trackCreatedAndAdded = () => ({
  type: actionTypes.TRACK_CREATED_AND_ADDED,
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
