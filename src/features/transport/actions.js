import { NAME } from './constants';

export const NOTE_TRIGGERED = `${NAME}/NOTE_TRIGGERED`;
export const PLAYBACK_PAUSED = `${NAME}/PLAYBACK_PAUSED`;
export const PLAYBACK_STARTED = `${NAME}/PLAYBACK_STARTED`;
export const PLAYBACK_STOPPED = `${NAME}/PLAYBACK_STOPPED`;
export const PLAYBACK_TOGGLED = `${NAME}/PLAYBACK_TOGGLED`;
export const POSITION_SET = `${NAME}/POSITION_SET`;
export const SEQUENCE_STEP_TRIGGERED = `${NAME}/SEQUENCE_STEP_TRIGGERED`;
export const SEQUENCES_SET = `${NAME}/SEQUENCES_SET`;
export const SEQUENCES_UPDATED = `${NAME}/SEQUENCES_UPDATED`;
export const SONG_POSITION_SET = `${NAME}/SONG_POSITION_SET`;
export const SONG_SEQUENCE_SET = `${NAME}/SONG_SEQUENCE_SET`;
export const SONG_SEQUENCE_STEP_TRIGGERED = `${NAME}/SONG_SEQUENCE_STEP_TRIGGERED`;
export const START_POINT_SET = `${NAME}/START_POINT_SET`;
export const TRANSPORT_POSITION_SET = `${NAME}/TRANSPORT_POSITION_SET`;

export const noteTriggered = payload => ({
  type: NOTE_TRIGGERED,
  payload,
});

export const playbackPaused = () => ({
  type: PLAYBACK_PAUSED,
});

export const playbackStarted = () => ({
  type: PLAYBACK_STARTED,
});

export const playbackStopped = () => ({
  type: PLAYBACK_STOPPED,
});

export const playbackToggled = () => ({
  type: PLAYBACK_TOGGLED,
});

export const positionSet = position => ({
  type: POSITION_SET,
  position,
});

export const sequencesSet = sequences => ({
  type: SEQUENCES_SET,
  sequences,
});

export const sequenceStepTriggered = payload => ({
  type: SEQUENCE_STEP_TRIGGERED,
  payload,
});

export const sequencesUpdated = () => ({
  type: SEQUENCES_UPDATED,
});

export const songPositionSet = position => ({
  type: SONG_POSITION_SET,
  position,
});

export const songSequenceSet = sequence => ({
  type: SONG_SEQUENCE_SET,
  sequence,
});

export const songSequenceStepTriggered = payload => ({
  type: SONG_SEQUENCE_STEP_TRIGGERED,
  payload,
});

export const startPointSet = startPoint => ({
  type: START_POINT_SET,
  startPoint,
});

export const transportPositionSet = measures => ({
  type: TRANSPORT_POSITION_SET,
  measures,
});
