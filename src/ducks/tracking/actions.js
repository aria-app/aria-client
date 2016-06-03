import song from 'ducks/song';
import * as actionTypes from './action-types';
import * as selectors from './selectors';

export function setSelectedSequenceId(selectedSequenceId) {
  return {
    type: actionTypes.SET_SELECTED_SEQUENCE_ID,
    selectedSequenceId,
  };
}

export function setStagedTrack(stagedTrack) {
  return {
    type: actionTypes.SET_STAGED_TRACK,
    stagedTrack,
  };
}

export function stageTrackForEditing(trackId) {
  return (dispatch, getState) => {
    const track = song.selectors.getTrackById(getState(), trackId);

    dispatch(setStagedTrack(track));
  };
}

export function updateStagedTrackSynthType(synthType) {
  return (dispatch, getState) => {
    const stagedTrack = selectors.getStagedTrack(getState());
    const updatedStagedTrack = {
      ...stagedTrack,
      synthType,
    };

    dispatch(setStagedTrack(updatedStagedTrack));
  };
}
