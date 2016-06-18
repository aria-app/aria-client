import * as actionTypes from './action-types';

export const applyStagedTrack = () => ({
  type: actionTypes.APPLY_STAGED_TRACK,
});

export const clearStagedTrack = () => ({
  type: actionTypes.CLEAR_STAGED_TRACK,
});

export const deleteStagedTrack = () => ({
  type: actionTypes.DELETE_STAGED_TRACK,
});

export const deselectSequence = () => ({
  type: actionTypes.DESELECT_SEQUENCE,
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

export const stageTrack = (track) => ({
  type: actionTypes.STAGE_TRACK,
  track,
});

export const undo = () => ({
  type: actionTypes.UNDO,
});

export const updateStagedSynthType = (synthType) => ({
  type: actionTypes.UPDATE_STAGED_SYNTH_TYPE,
  synthType,
});
