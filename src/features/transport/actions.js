import * as actionTypes from './action-types';

export const playbackPaused = () => ({
  type: actionTypes.PLAYBACK_PAUSED,
});

export const playbackStarted = () => ({
  type: actionTypes.PLAYBACK_STARTED,
});

export const playbackStopped = () => ({
  type: actionTypes.PLAYBACK_STOPPED,
});

export const playbackToggled = () => ({
  type: actionTypes.PLAYBACK_TOGGLED,
});

export const positionSet = position => ({
  type: actionTypes.POSITION_SET,
  position,
});

export const sequencesSet = sequences => ({
  type: actionTypes.SEQUENCES_SET,
  sequences,
});

export const sequenceStepTriggered = payload => ({
  type: actionTypes.SEQUENCE_STEP_TRIGGERED,
  payload,
});

export const sequencesUpdated = () => ({
  type: actionTypes.SEQUENCES_UPDATED,
});

export const songPositionSet = position => ({
  type: actionTypes.SONG_POSITION_SET,
  position,
});

export const songSequenceSet = sequence => ({
  type: actionTypes.SONG_SEQUENCE_SET,
  sequence,
});

export const songSequenceStepTriggered = payload => ({
  type: actionTypes.SONG_SEQUENCE_STEP_TRIGGERED,
  payload,
});

export const startPointSet = startPoint => ({
  type: actionTypes.START_POINT_SET,
  startPoint,
});

export const transportPositionSet = measures => ({
  type: actionTypes.TRANSPORT_POSITION_SET,
  measures,
});
