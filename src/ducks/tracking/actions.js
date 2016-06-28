import * as actionTypes from './action-types';

export const addNewTrack = () => ({
  type: actionTypes.ADD_NEW_TRACK,
});

export const addSequenceToTrack = (track, position) => ({
  type: actionTypes.ADD_SEQUENCE_TO_TRACK,
  track,
  position,
});

export const deleteSequence = (sequence) => ({
  type: actionTypes.DELETE_SEQUENCE,
  sequence,
});

export const deselectSequence = () => ({
  type: actionTypes.DESELECT_SEQUENCE,
});

export const extendSequence = (sequence) => ({
  type: actionTypes.EXTEND_SEQUENCE,
  sequence,
});

export const moveSequenceLeft = (sequence) => ({
  type: actionTypes.MOVE_SEQUENCE_LEFT,
  sequence,
});

export const moveSequenceRight = (sequence) => ({
  type: actionTypes.MOVE_SEQUENCE_RIGHT,
  sequence,
});

export const pushRedo = () => ({
  type: actionTypes.PUSH_REDO,
});

export const pushUndo = () => ({
  type: actionTypes.PUSH_UNDO,
});

export const redo = () => ({
  type: actionTypes.REDO,
});

export const selectSequence = (id) => ({
  type: actionTypes.SELECT_SEQUENCE,
  id,
});

export const setRedos = (redos) => ({
  type: actionTypes.SET_REDOS,
  redos,
});

export const setUndos = (undos) => ({
  type: actionTypes.SET_UNDOS,
  undos,
});

export const shortenSequence = (sequence) => ({
  type: actionTypes.SHORTEN_SEQUENCE,
  sequence,
});

export const toggleTrackIsMuted = (id) => ({
  type: actionTypes.TOGGLE_TRACK_IS_MUTED,
  id,
});

export const toggleTrackIsSoloing = (id) => ({
  type: actionTypes.TOGGLE_TRACK_IS_SOLOING,
  id,
});

export const trackEditingFinished = () => ({
  type: actionTypes.TRACK_EDITING_FINISHED,
});

export const trackEditingStarted = (id) => ({
  type: actionTypes.TRACK_EDITING_STARTED,
  id,
});

export const undo = () => ({
  type: actionTypes.UNDO,
});
