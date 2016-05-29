import * as actionTypes from './action-types';

export function setActiveSynths(activeSynths) {
  return {
    type: actionTypes.SET_ACTIVE_SYNTHS,
    activeSynths,
  };
}

export function setSynths(synths) {
  return {
    type: actionTypes.SET_SYNTHS,
    synths,
  };
}

export function setTracks(synths) {
  return {
    type: actionTypes.SET_SYNTHS,
    synths,
  };
}
