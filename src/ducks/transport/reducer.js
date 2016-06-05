import * as actionTypes from './action-types';
import * as constants from './constants';

const initialState = getInitialState();

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.PAUSE:
      return {
        ...state,
        playbackState: constants.playbackStates.PAUSED,
      };
    case actionTypes.PLAY:
      return {
        ...state,
        playbackState: constants.playbackStates.STARTED,
      };
    case actionTypes.STOP:
      return {
        ...state,
        playbackState: constants.playbackStates.STOPPED,
        position: 0,
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
    case actionTypes.SET_START_POINT:
      return {
        ...state,
        startPoint: action.startPoint,
      };
    default:
      return state;
  }
}

function getInitialState() {
  return {
    playbackState: constants.playbackStates.STOPPED,
    position: 0,
    sequences: [],
    startPoint: '0',
  };
}
