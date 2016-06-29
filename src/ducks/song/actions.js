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

export function trackCreatedAndAdded() {
  return {
    type: actionTypes.TRACK_CREATED_AND_ADDED,
    track: helpers.createTrack(),
  };
}

export function notesAdded(notes) {
  return {
    type: actionTypes.NOTES_ADDED,
    notes,
  };
}

export function notesDeleted(ids) {
  return {
    type: actionTypes.NOTES_DELETED,
    ids,
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

export function sequenceAddedToTrack(id, position) {
  return {
    type: actionTypes.SEQUENCE_ADDED_TO_TRACK,
    position,
    id,
  };
}

export function sequenceClosed() {
  return {
    type: actionTypes.SEQUENCE_CLOSED,
  };
}

export function sequenceExtended(id) {
  return {
    type: actionTypes.SEQUENCE_EXTENDED,
    id,
  };
}

export function sequenceNudgedLeft(id) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SEQUENCE_NUDGED_LEFT,
      id,
    });
  };
}

export function sequenceNudgedRight(id) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SEQUENCE_NUDGED_RIGHT,
      id,
    });
  };
}

export function sequenceOpened(id) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SEQUENCE_OPENED,
      id,
    });
  };
}

export function sequenceShortened(id) {
  return {
    type: actionTypes.SEQUENCE_SHORTENED,
    id,
  };
}

export function sequencesAdded(sequences) {
  return {
    type: actionTypes.SEQUENCES_ADDED,
    sequences,
  };
}

export function sequencesDeleted(ids) {
  return {
    type: actionTypes.SEQUENCES_DELETED,
    ids,
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

export function songShortened() {
  return {
    type: actionTypes.SONG_SHORTENED,
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

export function trackSynthTypeSet(id, synthType) {
  return {
    type: actionTypes.TRACK_SYNTH_TYPE_SET,
    synthType,
    id,
  };
}

export function tracksAdded(tracks) {
  return {
    type: actionTypes.TRACKS_ADDED,
    tracks,
  };
}

export function tracksDeleted(ids) {
  return {
    type: actionTypes.TRACKS_DELETED,
    ids,
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
