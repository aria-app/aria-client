import * as actionTypes from './action-types';
import * as constants from './constants';

const initialState = getInitialState();

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_BPM:
      return {
        ...state,
        bpm: action.bpm,
      };
    case actionTypes.SET_PLAYBACK_STATE:
      return {
        ...state,
        playbackState: action.playbackState,
      };
    case actionTypes.SET_POSITION:
      return {
        ...state,
        position: action.position,
      };
    case actionTypes.SET_SEQUENCES:
      return {
        ...state,
        sequences: action.sequences,
      };
    default:
      return state;
  }
}

function getInitialState() {
  return {
    bpm: constants.defaultBPM,
    playbackState: constants.playbackStates.STOPPED,
    position: 0,
    sequences: [],
  };
}
