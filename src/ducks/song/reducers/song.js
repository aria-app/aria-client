import * as actionTypes from '../action-types';

const song = (state = {}, action) => {
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
