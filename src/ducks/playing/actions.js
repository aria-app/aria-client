import * as actionTypes from './action-types';

export function addTrack(track) {
  return {
    type: actionTypes.ADD_TRACK,
    track,
  };
}

export function setTracks(tracks) {
  return {
    type: actionTypes.SET_TRACKS,
    tracks,
  };
}
