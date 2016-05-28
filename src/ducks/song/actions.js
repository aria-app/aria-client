import * as actionTypes from './action-types';

export function setSong(song) {
  return {
    type: actionTypes.SET_SONG,
    song,
  };
}
