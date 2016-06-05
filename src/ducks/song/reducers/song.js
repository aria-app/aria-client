import * as actionTypes from '../action-types';
import initialState from './initial-state';

const song = (state = initialState.song, action) => {
  switch (action.type) {
    case actionTypes.SET_BPM:
      return {
        ...state,
        bpm: action.bpm,
      };
    case actionTypes.SET_SONG:
      return action.song;
    default:
      return state;
  }
};

export default song;
