import { NAME } from './constants';

export const BPM_SET = `${NAME}/BPM_SET`;
export const ID_SET = `${NAME}/ID_SET`;
export const MEASURE_COUNT_SET = `${NAME}/MEASURE_COUNT_SET`;
export const NAME_SET = `${NAME}/NAME_SET`;
export const NOTES_ADDED = `${NAME}/NOTES_ADDED`;
export const NOTES_DELETED = `${NAME}/NOTES_DELETED`;
export const NOTES_DUPLICATED = `${NAME}/NOTES_DUPLICATED`;
export const NOTES_SET = `${NAME}/NOTES_SET`;
export const NOTES_UPDATED = `${NAME}/NOTES_UPDATED`;
export const SEQUENCE_ADDED_TO_TRACK = `${NAME}/SEQUENCE_ADDED_TO_TRACK`;
export const SEQUENCE_CLOSED = `${NAME}/SEQUENCE_CLOSED`;
export const SEQUENCE_EXTENDED = `${NAME}/SEQUENCE_EXTENDED`;
export const SEQUENCE_NUDGED_LEFT = `${NAME}/SEQUENCE_NUDGED_LEFT`;
export const SEQUENCE_NUDGED_RIGHT = `${NAME}/SEQUENCE_NUDGED_RIGHT`;
export const SEQUENCE_OPENED = `${NAME}/SEQUENCE_OPENED`;
export const SEQUENCE_SHORTENED = `${NAME}/SEQUENCE_SHORTENED`;
export const SEQUENCES_ADDED = `${NAME}/SEQUENCES_ADDED`;
export const SEQUENCES_DELETED = `${NAME}/SEQUENCES_DELETED`;
export const SEQUENCES_SET = `${NAME}/SEQUENCES_SET`;
export const SEQUENCES_UPDATED = `${NAME}/SEQUENCES_UPDATED`;
export const SONG_EXTENDED = `${NAME}/SONG_EXTENDED`;
export const SONG_LOADED = `${NAME}/SONG_LOADED`;
export const SONG_SHORTENED = `${NAME}/SONG_SHORTENED`;
export const TRACK_CREATED_AND_ADDED = `${NAME}/TRACK_CREATED_AND_ADDED`;
export const TRACK_DELETED = `${NAME}/TRACK_DELETED`;
export const TRACK_IS_MUTED_TOGGLED = `${NAME}/TRACK_IS_MUTED_TOGGLED`;
export const TRACK_IS_SOLOING_TOGGLED = `${NAME}/TRACK_IS_SOLOING_TOGGLED`;
export const TRACK_SYNTH_TYPE_SET = `${NAME}/TRACK_SYNTH_TYPE_SET`;
export const TRACKS_ADDED = `${NAME}/TRACKS_ADDED`;
export const TRACKS_DELETED = `${NAME}/TRACKS_DELETED`;
export const TRACKS_SET = `${NAME}/TRACKS_SET`;
export const TRACKS_UPDATED = `${NAME}/TRACKS_UPDATED`;

export const bpmSet = bpm => ({
  type: BPM_SET,
  bpm,
});

export const idSet = id => ({
  type: ID_SET,
  id,
});

export const measureCountSet = measureCount => ({
  type: MEASURE_COUNT_SET,
  measureCount,
});

export const nameSet = name => ({
  type: NAME_SET,
  name,
});

export const trackCreatedAndAdded = () => ({
  type: TRACK_CREATED_AND_ADDED,
});

export const notesAdded = notes => ({
  type: NOTES_ADDED,
  notes,
});

export const notesDeleted = ids => ({
  type: NOTES_DELETED,
  ids,
});

export const notesSet = notes => ({
  type: NOTES_SET,
  notes,
});

export const notesUpdated = notes => ({
  type: NOTES_UPDATED,
  notes,
});

export const sequenceAddedToTrack = (id, position) => ({
  type: SEQUENCE_ADDED_TO_TRACK,
  position,
  id,
});

export const sequenceClosed = () => ({
  type: SEQUENCE_CLOSED,
});

export const sequenceExtended = id => ({
  type: SEQUENCE_EXTENDED,
  id,
});

export const sequenceNudgedLeft = id => ({
  type: SEQUENCE_NUDGED_LEFT,
  id,
});

export const sequenceNudgedRight = id => ({
  type: SEQUENCE_NUDGED_RIGHT,
  id,
});

export const sequenceOpened = id => ({
  type: SEQUENCE_OPENED,
  id,
});

export const sequenceShortened = id => ({
  type: SEQUENCE_SHORTENED,
  id,
});

export const sequencesAdded = sequences => ({
  type: SEQUENCES_ADDED,
  sequences,
});

export const sequencesDeleted = ids => ({
  type: SEQUENCES_DELETED,
  ids,
});

export const sequencesSet = sequences => ({
  type: SEQUENCES_SET,
  sequences,
});

export const sequencesUpdated = sequences => ({
  type: SEQUENCES_UPDATED,
  sequences,
});

export const songExtended = () => ({
  type: SONG_EXTENDED,
});

export const songLoaded = song => ({
  type: SONG_LOADED,
  song,
});

export const songShortened = () => ({
  type: SONG_SHORTENED,
});

export const trackDeleted = id => ({
  type: TRACK_DELETED,
  id,
});

export const trackIsMutedToggled = id => ({
  type: TRACK_IS_MUTED_TOGGLED,
  id,
});

export const trackIsSoloingToggled = id => ({
  type: TRACK_IS_SOLOING_TOGGLED,
  id,
});

export const trackSynthTypeSet = (id, synthType) => ({
  type: TRACK_SYNTH_TYPE_SET,
  synthType,
  id,
});

export const tracksAdded = tracks => ({
  type: TRACKS_ADDED,
  tracks,
});

export const tracksDeleted = ids => ({
  type: TRACKS_DELETED,
  ids,
});

export const tracksSet = tracks => ({
  type: TRACKS_SET,
  tracks,
});

export const tracksUpdated = tracks => ({
  type: TRACKS_UPDATED,
  tracks,
});
