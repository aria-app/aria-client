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

export function setPlaybackState(playbackState) {
  return {
    type: actionTypes.SET_PLAYBACK_STATE,
    playbackState,
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

export function setStartPoint(startPoint) {
  return {
    type: actionTypes.SET_START_POINT,
    startPoint,
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
