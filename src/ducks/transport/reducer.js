import { combineReducers } from 'redux';
import * as actionTypes from './action-types';
import * as constants from './constants';

const { PAUSED, STARTED, STOPPED } = constants.playbackStates;

const playbackState = (state = STOPPED, action) => {
  switch (action.type) {
    case actionTypes.PAUSE:
      return PAUSED;
    case actionTypes.PLAY:
      return STARTED;
    case actionTypes.STOPPED:
      return STOPPED;
    case actionTypes.TOGGLE_PLAY_PAUSE:
      return state === STARTED ? PAUSED : STARTED;
    default:
      return state;
  }
};

const position = (state = 0, action) => {
  switch (action.type) {
    case actionTypes.SET_POSITION:
      return action.position;
    case actionTypes.STOPPED:
      return '0';
    default:
      return state;
  }
};

const sequences = (state = [], action) => {
  switch (action.type) {
    case actionTypes.SET_SEQUENCES:
      return action.sequences;
    default:
      return state;
  }
};

const songPosition = (state = 0, action) => {
  switch (action.type) {
    case actionTypes.SET_SONG_POSITION:
      return action.position;
    case actionTypes.STOPPED:
      return '0';
    default:
      return state;
  }
};

const songSequence = (state = 0, action) => {
  switch (action.type) {
    case actionTypes.SET_SONG_SEQUENCE:
      return action.sequence;
    default:
      return state;
  }
};

const startPoint = (state = '0', action) => {
  switch (action.type) {
    case actionTypes.START_POINT_SET:
      return action.startPoint;
    default:
      return state;
  }
};

export default combineReducers({
  playbackState,
  position,
  sequences,
  songPosition,
  songSequence,
  startPoint,
});
