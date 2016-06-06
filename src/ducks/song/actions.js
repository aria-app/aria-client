import _ from 'lodash';
import shared from 'ducks/shared';
import * as actionTypes from './action-types';
import * as helpers from './helpers';

export function addNewTrack() {
  return {
    type: actionTypes.ADD_NEW_TRACK,
    track: helpers.createTrack(),
  };
}

export function addNote(note) {
  return {
    type: actionTypes.ADD_NOTE,
    note,
  };
}

export function addNotes(notes) {
  return {
    type: actionTypes.ADD_NOTES,
    notes,
  };
}

export function addSequences(sequences) {
  return {
    type: actionTypes.ADD_SEQUENCES,
    sequences,
  };
}

export function addTracks(tracks) {
  return {
    type: actionTypes.ADD_TRACKS,
    tracks,
  };
}

export function closeSequence() {
  return {
    type: actionTypes.CLOSE_SEQUENCE,
  };
}

export function decrementMeasureCount() {
  return {
    type: actionTypes.DECREMENT_MEASURE_COUNT,
  };
}

export function deleteNotes(notes) {
  return {
    type: actionTypes.DELETE_NOTES,
    notes,
  };
}

export function deleteSequences(sequences) {
  return {
    type: actionTypes.DELETE_SEQUENCES,
    sequences,
  };
}

export function deleteTracks(tracks) {
  return {
    type: actionTypes.DELETE_TRACKS,
    tracks,
  };
}

export function deleteTrackById(id) {
  return {
    type: actionTypes.DELETE_TRACK_BY_ID,
    id,
  };
}

export function incrementMeasureCount() {
  return {
    type: actionTypes.INCREMENT_MEASURE_COUNT,
  };
}

export function loadSong(song) {
  return {
    type: actionTypes.LOAD_SONG,
    song,
  };
}

export function openSequence(id) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.OPEN_SEQUENCE,
      id,
    });
  };
}


export function safeSetBPM(bpm) {
  return (dispatch) => {
    const safeBPM = _.clamp(bpm, shared.constants.minBPM, shared.constants.maxBPM);

    dispatch(setBPM(safeBPM));
  };
}

export function setBPM(bpm) {
  return {
    type: actionTypes.SET_BPM,
    bpm,
  };
}

export function setID(id) {
  return {
    type: actionTypes.SET_ID,
    id,
  };
}

export function setMeasureCount(measureCount) {
  return {
    type: actionTypes.SET_MEASURE_COUNT,
    measureCount,
  };
}

export function setName(name) {
  return {
    type: actionTypes.SET_NAME,
    name,
  };
}

export function setNotes(notes) {
  return {
    type: actionTypes.SET_NOTES,
    notes,
  };
}

export function setSequences(sequences) {
  return {
    type: actionTypes.SET_SEQUENCES,
    sequences,
  };
}

export function setSong(song) {
  return {
    type: actionTypes.SET_SONG,
    song,
  };
}

export function setTracks(tracks) {
  return {
    type: actionTypes.SET_TRACKS,
    tracks,
  };
}

export function updateNotes(notes) {
  return {
    type: actionTypes.UPDATE_NOTES,
    notes,
  };
}

export function updateSequences(sequences) {
  return {
    type: actionTypes.UPDATE_SEQUENCES,
    sequences,
  };
}

export function updateTrack(track) {
  return {
    type: actionTypes.UPDATE_TRACK,
    track,
  };
}

export function updateTracks(tracks) {
  return {
    type: actionTypes.UPDATE_TRACKS,
    tracks,
  };
}

// export function decrementSequenceLength(id) {
//   return (dispatch, getState) => {
//     const sequence = selectors.getSequenceById(getState(), id);
//     const newMeasureCount = sequence.measureCount - 1;
//
//     if (newMeasureCount < 1) return;
//
//     const updatedSequence = {
//       ...sequence,
//       measureCount: newMeasureCount,
//     };
//
//     dispatch(updateSequence(updatedSequence));
//     dispatch(transport.effects.updateSequences());
//   };
// }
//
// export function incrementSequenceLength(id) {
//   return (dispatch, getState) => {
//     const sequence = selectors.getSequenceById(getState(), id);
//     const newMeasureCount = sequence.measureCount + 1;
//
//     const updatedSequence = {
//       ...sequence,
//       measureCount: newMeasureCount,
//     };
//
//     dispatch(updateSequence(updatedSequence));
//     dispatch(transport.effects.updateSequences());
//   };
// }
//
// export function decrementSequencePosition(id) {
//   return (dispatch, getState) => {
//     const sequence = selectors.getSequenceById(getState(), id);
//     const newPosition = sequence.position - 1;
//
//     if (newPosition < 0) return;
//
//     const updatedSequence = {
//       ...sequence,
//       position: newPosition,
//     };
//
//     dispatch(updateSequence(updatedSequence));
//     dispatch(transport.effects.updateSequences());
//   };
// }
//
// export function incrementSequencePosition(id) {
//   return (dispatch, getState) => {
//     const songMeasureCount = selectors.getMeasureCount(getState());
//     const sequence = selectors.getSequenceById(getState(), id);
//     const newPosition = sequence.position + 1;
//
//     if (newPosition > songMeasureCount - 1) return;
//
//     const updatedSequence = {
//       ...sequence,
//       position: newPosition,
//     };
//
//     dispatch(updateSequence(updatedSequence));
//     dispatch(transport.effects.updateSequences());
//   };
// }
//
