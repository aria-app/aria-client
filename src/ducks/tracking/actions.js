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

export const selectSequence = (id) => ({
  type: actionTypes.SELECT_SEQUENCE,
  id,
});

export const stageTrack = (track) => ({
  type: actionTypes.STAGE_TRACK,
  track,
});

export const updateStagedSynthType = (synthType) => ({
  type: actionTypes.UPDATE_STAGED_SYNTH_TYPE,
  synthType,
});
