import song from 'ducks/song';
import * as actionTypes from './action-types';
import * as selectors from './selectors';

export function applyStagedTrack() {
  return (dispatch, getState) => {
    const stagedTrack = selectors.getStagedTrack(getState());
    dispatch(song.actions.updateTrack(stagedTrack));
    dispatch(clearStagedTrack());
  };
}

export function clearStagedTrack() {
  return {
    type: actionTypes.CLEAR_STAGED_TRACK,
  };
}

export function deleteStagedTrack() {
  return (dispatch, getState) => {
    const stagedTrack = selectors.getStagedTrack(getState());

    dispatch(song.actions.deleteTrackById(stagedTrack.id));
    dispatch(clearStagedTrack());
  };
}

export function openSequence(id) {
  return {
    type: actionTypes.OPEN_SEQUENCE,
    id,
  };
}

export function setSelectedSequenceId(selectedSequenceId) {
  return {
    type: actionTypes.SET_SELECTED_SEQUENCE_ID,
    selectedSequenceId,
  };
}

export function stageTrack(track) {
  return {
    type: actionTypes.STAGE_TRACK,
    track,
  };
}

export function updateStagedTrackSynthType(synthType) {
  return (dispatch, getState) => {
    const stagedTrack = selectors.getStagedTrack(getState());
    const updatedStagedTrack = {
      ...stagedTrack,
      synthType,
    };

    dispatch(stageTrack(updatedStagedTrack));
  };
}
