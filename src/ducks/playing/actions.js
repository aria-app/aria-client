import * as actionTypes from './action-types';

export function setTracks(tracks) {
  return {
    type: actionTypes.SET_TRACKS,
    tracks,
  };
}
