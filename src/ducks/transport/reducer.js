import * as actionTypes from './action-types';
import * as constants from './constants';

const { PAUSED, STARTED, STOPPED } = constants.playbackStates;
const initialState = getInitialState();

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.PAUSE:
      return {
        ...state,
        playbackState: PAUSED,
      };
    case actionTypes.PLAY:
      return {
        ...state,
        playbackState: STARTED,
      };
    case actionTypes.STOP:
      return {
        ...state,
        playbackState: STOPPED,
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
    case actionTypes.TOGGLE_PLAY_PAUSE:
      return {
        ...state,
        playbackState: state.playbackState === STARTED
          ? PAUSED
          : STARTED,
      };
    default:
      return state;
  }
}

function getInitialState() {
  return {
    playbackState: STOPPED,
    position: 0,
    sequences: [],
    startPoint: '0',
  };
}
