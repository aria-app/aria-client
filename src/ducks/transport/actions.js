import * as actionTypes from './action-types';

export function pause() {
  return {
    type: actionTypes.PAUSE,
  };
}

export function play() {
  return {
    type: actionTypes.PLAY,
  };
}

export function sequenceStep(payload) {
  return {
    type: actionTypes.SEQUENCE_STEP,
    payload,
  };
}

export function setPosition(position) {
  return {
    type: actionTypes.SET_POSITION,
    position,
  };
}

export function setSequences(sequences) {
  return {
    type: actionTypes.SET_SEQUENCES,
    sequences,
  };
}

export function setSongPosition(position) {
  return {
    type: actionTypes.SET_SONG_POSITION,
    position,
  };
}

export function setSongSequence(sequence) {
  return {
    type: actionTypes.SET_SONG_SEQUENCE,
    sequence,
  };
}

export function setStartPoint(startPoint) {
  return {
    type: actionTypes.SET_START_POINT,
    startPoint,
  };
}

export function setTransportPosition(measures) {
  return {
    type: actionTypes.SET_TRANSPORT_POSITION,
    measures,
  };
}

export function songSequenceStep(payload) {
  return {
    type: actionTypes.SONG_SEQUENCE_STEP,
    payload,
  };
}

export function stop() {
  return {
    type: actionTypes.STOP,
  };
}

export function togglePlayPause() {
  return {
    type: actionTypes.TOGGLE_PLAY_PAUSE,
  };
}

export function updateSequences() {
  return {
    type: actionTypes.UPDATE_SEQUENCES,
  };
}
