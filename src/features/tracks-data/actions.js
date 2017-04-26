import { NAME } from './constants';

export const SEQUENCE_NUDGED_LEFT = `${NAME}/SEQUENCE_NUDGED_LEFT`;
export const SEQUENCE_NUDGED_RIGHT = `${NAME}/SEQUENCE_NUDGED_RIGHT`;
export const SEQUENCE_ADDED = `${NAME}/SEQUENCE_ADDED`;
export const SEQUENCE_DELETED = `${NAME}/SEQUENCE_DELETED`;
export const SEQUENCE_DESELECTED = `${NAME}/SEQUENCE_DESELECTED`;
export const SEQUENCE_EXTENDED = `${NAME}/SEQUENCE_EXTENDED`;
export const SEQUENCE_OPENED = `${NAME}/SEQUENCE_OPENED`;
export const SEQUENCE_SELECTED = `${NAME}/SEQUENCE_SELECTED`;
export const SEQUENCE_SHORTENED = `${NAME}/SEQUENCE_SHORTENED`;
export const SONG_EXTENDED = `${NAME}/SONG_EXTENDED`;
export const SONG_SHORTENED = `${NAME}/SONG_SHORTENED`;
export const TRACK_ADDED = `${NAME}/TRACK_ADDED`;
export const TRACK_DELETED = `${NAME}/TRACK_DELETED`;
export const TRACK_EDITING_FINISHED = `${NAME}/TRACK_EDITING_FINISHED`;
export const TRACK_EDITING_STARTED = `${NAME}/TRACK_EDITING_STARTED`;
export const TRACK_IS_MUTED_TOGGLED = `${NAME}/TRACK_IS_MUTED_TOGGLED`;
export const TRACK_IS_SOLOING_TOGGLED = `${NAME}/TRACK_IS_SOLOING_TOGGLED`;
export const TRACK_SYNTH_TYPE_SET = `${NAME}/TRACK_SYNTH_TYPE_SET`;

export const sequenceAdded = ({ position, sequenceId, trackId }) => ({
  type: SEQUENCE_ADDED,
  position,
  sequenceId,
  trackId,
});

export const sequenceDeleted = id => ({
  type: SEQUENCE_DELETED,
  id,
});

export const sequenceDeselected = () => ({
  type: SEQUENCE_DESELECTED,
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

export const sequenceSelected = id => ({
  type: SEQUENCE_SELECTED,
  id,
});

export const sequenceShortened = id => ({
  type: SEQUENCE_SHORTENED,
  id,
});

export const songExtended = () => ({
  type: SONG_EXTENDED,
});

export const songShortened = () => ({
  type: SONG_SHORTENED,
});

export const trackAdded = ({ sequenceId, trackId }) => ({
  type: TRACK_ADDED,
  sequenceId,
  trackId,
});

export const trackDeleted = ({ id, sequenceIds }) => ({
  type: TRACK_DELETED,
  id,
  sequenceIds,
});

export const trackEditingFinished = () => ({
  type: TRACK_EDITING_FINISHED,
});

export const trackEditingStarted = id => ({
  type: TRACK_EDITING_STARTED,
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

export const trackSynthTypeSet = payload => ({
  type: TRACK_SYNTH_TYPE_SET,
  payload,
});
