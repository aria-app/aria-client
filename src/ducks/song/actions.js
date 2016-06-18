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

export function addSequence(sequence) {
  return {
    type: actionTypes.ADD_SEQUENCE,
    sequence,
  };
}

export function addSequenceToTrack(track, position) {
  return {
    type: actionTypes.ADD_SEQUENCE_TO_TRACK,
    position,
    track,
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

export function deleteSequence(sequence) {
  return {
    type: actionTypes.DELETE_SEQUENCE,
    sequence,
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

export function extendSequence(sequence) {
  return {
    type: actionTypes.EXTEND_SEQUENCE,
    sequence,
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

export function moveSequenceLeft(sequence) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.MOVE_SEQUENCE_LEFT,
      sequence,
    });
  };
}

export function moveSequenceRight(sequence) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.MOVE_SEQUENCE_RIGHT,
      sequence,
    });
  };
}

export function openSequence(sequence) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.OPEN_SEQUENCE,
      sequence,
    });
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

export function shortenSequence(sequence) {
  return {
    type: actionTypes.SHORTEN_SEQUENCE,
    sequence,
  };
}

export function toggleTrackIsMuted(id) {
  return {
    type: actionTypes.TOGGLE_TRACK_IS_MUTED,
    id,
  };
}

export function toggleTrackIsSoloing(id) {
  return {
    type: actionTypes.TOGGLE_TRACK_IS_SOLOING,
    id,
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
