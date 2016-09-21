import * as actionTypes from './action-types';
import * as helpers from './helpers';

export const bpmSet = bpm => ({
  type: actionTypes.BPM_SET,
  bpm,
});

export const idSet = id => ({
  type: actionTypes.ID_SET,
  id,
});

export const measureCountSet = measureCount => ({
  type: actionTypes.MEASURE_COUNT_SET,
  measureCount,
});

export const nameSet = name => ({
  type: actionTypes.NAME_SET,
  name,
});

export const trackCreatedAndAdded = () => ({
  type: actionTypes.TRACK_CREATED_AND_ADDED,
  track: helpers.createTrack(),
});

export const notesAdded = (notes) => ({
  type: actionTypes.NOTES_ADDED,
  notes,
});

export const notesDeleted = ids => ({
  type: actionTypes.NOTES_DELETED,
  ids,
});

export const notesSet = notes => ({
  type: actionTypes.NOTES_SET,
  notes,
});

export const notesUpdated = notes => ({
  type: actionTypes.NOTES_UPDATED,
  notes,
});

export const sequenceAddedToTrack = (id, position) => ({
  type: actionTypes.SEQUENCE_ADDED_TO_TRACK,
  position,
  id,
});

export const sequenceClosed = () => ({
  type: actionTypes.SEQUENCE_CLOSED,
});

export const sequenceExtended = id => ({
  type: actionTypes.SEQUENCE_EXTENDED,
  id,
});

export const sequenceNudgedLeft = id => ({
  type: actionTypes.SEQUENCE_NUDGED_LEFT,
  id,
});

export const sequenceNudgedRight = id => ({
  type: actionTypes.SEQUENCE_NUDGED_RIGHT,
  id,
});

export const sequenceOpened = id => ({
  type: actionTypes.SEQUENCE_OPENED,
  id,
});

export const sequenceShortened = id => ({
  type: actionTypes.SEQUENCE_SHORTENED,
  id,
});

export const sequencesAdded = sequences => ({
  type: actionTypes.SEQUENCES_ADDED,
  sequences,
});

export const sequencesDeleted = ids => ({
  type: actionTypes.SEQUENCES_DELETED,
  ids,
});

export const sequencesSet = sequences => ({
  type: actionTypes.SEQUENCES_SET,
  sequences,
});

export const sequencesUpdated = sequences => ({
  type: actionTypes.SEQUENCES_UPDATED,
  sequences,
});

export const songExtended = () => ({
  type: actionTypes.SONG_EXTENDED,
});

export const songLoaded = song => ({
  type: actionTypes.SONG_LOADED,
  song,
});

export const songShortened = () => ({
  type: actionTypes.SONG_SHORTENED,
});

export const trackIsMutedToggled = id => ({
  type: actionTypes.TRACK_IS_MUTED_TOGGLED,
  id,
});

export const trackIsSoloingToggled = id => ({
  type: actionTypes.TRACK_IS_SOLOING_TOGGLED,
  id,
});

export const trackSynthTypeSet = (id, synthType) => ({
  type: actionTypes.TRACK_SYNTH_TYPE_SET,
  synthType,
  id,
});

export const tracksAdded = tracks => ({
  type: actionTypes.TRACKS_ADDED,
  tracks,
});

export const tracksDeleted = ids => ({
  type: actionTypes.TRACKS_DELETED,
  ids,
});

export const tracksSet = tracks => ({
  type: actionTypes.TRACKS_SET,
  tracks,
});

export const tracksUpdated = tracks => ({
  type: actionTypes.TRACKS_UPDATED,
  tracks,
});
