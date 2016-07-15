import { combineReducers } from 'redux';
import shortcuts from 'ducks/shortcuts';
import * as actionTypes from './action-types';
import * as constants from './constants';

const { PAUSED, STARTED, STOPPED } = constants.playbackStates;

const playbackState = (state = STOPPED, action) => {
  switch (action.type) {
    case actionTypes.PLAYBACK_PAUSED:
      return PAUSED;
    case actionTypes.PLAYBACK_STARTED:
      return STARTED;
    case actionTypes.PLAYBACK_STOPPED:
    case shortcuts.actionTypes.PLAYBACK_STOP:
      return STOPPED;
    case actionTypes.PLAYBACK_TOGGLED:
    case shortcuts.actionTypes.PLAYBACK_TOGGLE:
      return state === STARTED ? PAUSED : STARTED;
    default:
      return state;
  }
};

const position = (state = 0, action) => {
  switch (action.type) {
    case actionTypes.POSITION_SET:
      return action.position;
    case actionTypes.PLAYBACK_STOPPED:
      return 0;
    default:
      return state;
  }
};

const sequences = (state = [], action) => {
  switch (action.type) {
    case actionTypes.SEQUENCES_SET:
      return action.sequences;
    default:
      return state;
  }
};

const songPosition = (state = 0, action) => {
  switch (action.type) {
    case actionTypes.SONG_POSITION_SET:
      return action.position;
    case actionTypes.PLAYBACK_STOPPED:
      return 0;
    default:
      return state;
  }
};

const songSequence = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.SONG_SEQUENCE_SET:
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
