import * as actionTypes from './action-types';
import * as helpers from './helpers';

export function bpmSet(bpm) {
  return {
    type: actionTypes.BPM_SET,
    bpm,
  };
}

export function idSet(id) {
  return {
    type: actionTypes.ID_SET,
    id,
  };
}

export function measureCountSet(measureCount) {
  return {
    type: actionTypes.MEASURE_COUNT_SET,
    measureCount,
  };
}

export function nameSet(name) {
  return {
    type: actionTypes.NAME_SET,
    name,
  };
}

export function newTrackAdded() {
  return {
    type: actionTypes.NEW_TRACK_ADDED,
    track: helpers.createTrack(),
  };
}

export function noteAdded(note) {
  return {
    type: actionTypes.NOTE_ADDED,
    note,
  };
}

export function notesAdded(notes) {
  return {
    type: actionTypes.NOTES_ADDED,
    notes,
  };
}

export function notesDeleted(notes) {
  return {
    type: actionTypes.NOTES_DELETED,
    notes,
  };
}

export function notesSet(notes) {
  return {
    type: actionTypes.NOTES_SET,
    notes,
  };
}

export function notesUpdated(notes) {
  return {
    type: actionTypes.NOTES_UPDATED,
    notes,
  };
}

export function sequenceAdded(sequence) {
  return {
    type: actionTypes.SEQUENCE_ADDED,
    sequence,
  };
}

export function sequenceAddedToTrack(track, position) {
  return {
    type: actionTypes.SEQUENCE_ADDED_TO_TRACK,
    position,
    track,
  };
}

export function sequenceClosed() {
  return {
    type: actionTypes.SEQUENCE_CLOSED,
  };
}

export function sequenceDeleted(sequence) {
  return {
    type: actionTypes.SEQUENCE_DELETED,
    sequence,
  };
}

export function sequenceExtended(sequence) {
  return {
    type: actionTypes.SEQUENCE_EXTENDED,
    sequence,
  };
}

export function sequenceNudgedLeft(sequence) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SEQUENCE_NUDGED_LEFT,
      sequence,
    });
  };
}

export function sequenceNudgedRight(sequence) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SEQUENCE_NUDGED_RIGHT,
      sequence,
    });
  };
}

export function sequenceOpened(sequence) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SEQUENCE_OPENED,
      sequence,
    });
  };
}

export function sequenceShortened(sequence) {
  return {
    type: actionTypes.SEQUENCE_SHORTENED,
    sequence,
  };
}

export function sequencesAdded(sequences) {
  return {
    type: actionTypes.SEQUENCES_ADDED,
    sequences,
  };
}

export function sequencesDeleted(sequences) {
  return {
    type: actionTypes.SEQUENCES_DELETED,
    sequences,
  };
}

export function sequencesSet(sequences) {
  return {
    type: actionTypes.SEQUENCES_SET,
    sequences,
  };
}

export function sequencesUpdated(sequences) {
  return {
    type: actionTypes.SEQUENCES_UPDATED,
    sequences,
  };
}

export function songExtended() {
  return {
    type: actionTypes.SONG_EXTENDED,
  };
}

export function songLoaded(song) {
  return {
    type: actionTypes.SONG_LOADED,
    song,
  };
}

export function songSet(song) {
  return {
    type: actionTypes.SONG_SET,
    song,
  };
}

export function songShortened() {
  return {
    type: actionTypes.SONG_SHORTENED,
  };
}

export function trackDeletedById(id) {
  return {
    type: actionTypes.TRACK_DELETED_BY_ID,
    id,
  };
}

export function trackIsMutedToggled(id) {
  return {
    type: actionTypes.trackIsMutedToggled,
    id,
  };
}

export function trackIsSoloingToggled(id) {
  return {
    type: actionTypes.TRACK_IS_SOLOING_TOGGLED,
    id,
  };
}

export function trackSynthTypeSet(track, synthType) {
  return {
    type: actionTypes.TRACK_SYNTH_TYPE_SET,
    synthType,
    track,
  };
}

export function trackUpdated(track) {
  return {
    type: actionTypes.TRACK_UPDATED,
    track,
  };
}

export function tracksAdded(tracks) {
  return {
    type: actionTypes.TRACKS_ADDED,
    tracks,
  };
}

export function tracksDeleted(tracks) {
  return {
    type: actionTypes.TRACKS_DELETED,
    tracks,
  };
}

export function tracksSet(tracks) {
  return {
    type: actionTypes.TRACKS_SET,
    tracks,
  };
}

export function tracksUpdated(tracks) {
  return {
    type: actionTypes.TRACKS_UPDATED,
    tracks,
  };
}
