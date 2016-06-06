import _ from 'lodash';
import shared from 'ducks/shared';
import transport from 'ducks/transport';
import * as actionTypes from './action-types';
import * as helpers from './helpers';
import * as selectors from './selectors';

export function addNewTrack() {
  const track = helpers.createTrack();
  return {
    type: actionTypes.ADD_NEW_TRACK,
    sequence: helpers.createSequence({
      measureCount: 1,
      position: 0,
      trackId: track.id,
    }),
    track,
  };
}

export function addNotesToActiveSequence(pointSets) {
  return (dispatch, getState) => {
    const sequenceId = selectors.getActiveSequenceId(getState());
    const notes = pointSets.map(points => helpers.createNote({
      points,
      sequenceId,
    }));

    dispatch(addNotes(notes));
    return notes;
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
  return (dispatch) => {
    dispatch({
      type: actionTypes.CLOSE_SEQUENCE,
    });
    dispatch(transport.effects.updateLooping());
  };
}

export function decrementSongLength() {
  return (dispatch, getState) => {
    const song = selectors.getSong(getState());
    const newMeasureCount = song.measureCount - 1;

    if (newMeasureCount < 1) return;

    const updatedSong = {
      ...song,
      measureCount: newMeasureCount,
    };

    dispatch(setSong(updatedSong));
    dispatch(transport.effects.updateLooping());
  };
}

export function incrementSongLength() {
  return (dispatch, getState) => {
    const song = selectors.getSong(getState());
    const newMeasureCount = song.measureCount + 1;

    const updatedSong = {
      ...song,
      measureCount: newMeasureCount,
    };

    dispatch(setSong(updatedSong));
    dispatch(transport.effects.updateLooping());
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

export function deleteTrackById(trackId) {
  return (dispatch, getState) => {
    const tracks = selectors.getTracks(getState());
    const updatedTracks = _.reject(tracks, { id: trackId });

    dispatch(setTracks(updatedTracks));
  };
}

export function loadProject({ notes, sequences, song, tracks }) {
  return (dispatch) => {
    dispatch(setNotes(notes.ids.map(id => notes.dict[id])));
    dispatch(setSequences(sequences.ids.map(id => sequences.dict[id])));
    dispatch(setSong(song));
    dispatch(setTracks(tracks.ids.map(id => tracks.dict[id])));
  };
}

export function openSequence(id) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.OPEN_SEQUENCE,
      id,
    });
    dispatch(transport.effects.updateLooping());
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

export function setMeasureCount(measureCount) {
  return {
    type: actionTypes.SET_MEASURE_COUNT,
    measureCount,
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
//     const songMeasureCount = selectors.getSongMeasureCount(getState());
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
