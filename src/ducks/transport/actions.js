import * as actionTypes from './action-types';

export function playbackPaused() {
  return {
    type: actionTypes.PLAYBACK_PAUSED,
  };
}

export function playbackStarted() {
  return {
    type: actionTypes.PLAYBACK_STARTED,
  };
}

export function playbackStopped() {
  return {
    type: actionTypes.PLAYBACK_STOPPED,
  };
}

export function playbackToggled() {
  return {
    type: actionTypes.PLAYBACK_TOGGLED,
  };
}

export function positionSet(position) {
  return {
    type: actionTypes.POSITION_SET,
    position,
  };
}

export function sequencesSet(sequences) {
  return {
    type: actionTypes.SEQUENCES_SET,
    sequences,
  };
}

export function sequenceStepTriggered(payload) {
  return {
    type: actionTypes.SEQUENCE_STEP_TRIGGERED,
    payload,
  };
}

export function sequencesUpdated() {
  return {
    type: actionTypes.SEQUENCES_UPDATED,
  };
}

export function songPositionSet(position) {
  return {
    type: actionTypes.SONG_POSITION_SET,
    position,
  };
}

export function songSequenceSet(sequence) {
  return {
    type: actionTypes.SONG_SEQUENCE_SET,
    sequence,
  };
}

export function songSequenceStepTriggered(payload) {
  return {
    type: actionTypes.SONG_SEQUENCE_STEP_TRIGGERED,
    payload,
  };
}

export function startPointSet(startPoint) {
  return {
    type: actionTypes.START_POINT_SET,
    startPoint,
  };
}

export function transportPositionSet(measures) {
  return {
    type: actionTypes.TRANSPORT_POSITION_SET,
    measures,
  };
}
