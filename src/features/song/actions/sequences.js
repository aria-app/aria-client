import { NAME } from '../constants';

export const SEQUENCE_ADDED_TO_TRACK = `${NAME}/SEQUENCE_ADDED_TO_TRACK`;
export const SEQUENCE_EXTENDED = `${NAME}/SEQUENCE_EXTENDED`;
export const SEQUENCE_NUDGED_LEFT = `${NAME}/SEQUENCE_NUDGED_LEFT`;
export const SEQUENCE_NUDGED_RIGHT = `${NAME}/SEQUENCE_NUDGED_RIGHT`;
export const SEQUENCE_SHORTENED = `${NAME}/SEQUENCE_SHORTENED`;
export const SEQUENCES_ADDED = `${NAME}/SEQUENCES_ADDED`;
export const SEQUENCES_DELETED = `${NAME}/SEQUENCES_DELETED`;
export const SEQUENCES_SET = `${NAME}/SEQUENCES_SET`;
export const SEQUENCES_UPDATED = `${NAME}/SEQUENCES_UPDATED`;

export const sequenceAddedToTrack = (id, position) => ({
  type: SEQUENCE_ADDED_TO_TRACK,
  position,
  id,
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
