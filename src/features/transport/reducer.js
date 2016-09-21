import { combineReducers } from 'redux';
import shortcuts from '../shortcuts';
import * as actions from './actions';
import * as constants from './constants';

const { PAUSED, STARTED, STOPPED } = constants.playbackStates;

const playbackState = (state = STOPPED, action) => {
  switch (action.type) {
    case actions.PLAYBACK_PAUSED:
      return PAUSED;
    case actions.PLAYBACK_STARTED:
      return STARTED;
    case actions.PLAYBACK_STOPPED:
    case shortcuts.actions.PLAYBACK_STOP:
      return STOPPED;
    case actions.PLAYBACK_TOGGLED:
    case shortcuts.actions.PLAYBACK_TOGGLE:
      return state === STARTED ? PAUSED : STARTED;
    default:
      return state;
  }
};

const position = (state = 0, action) => {
  switch (action.type) {
    case actions.POSITION_SET:
      return action.position;
    case actions.PLAYBACK_STOPPED:
      return 0;
    default:
      return state;
  }
};

const sequences = (state = [], action) => {
  switch (action.type) {
    case actions.SEQUENCES_SET:
      return action.sequences;
    default:
      return state;
  }
};

const songPosition = (state = 0, action) => {
  switch (action.type) {
    case actions.SONG_POSITION_SET:
      return action.position;
    case actions.PLAYBACK_STOPPED:
      return 0;
    default:
      return state;
  }
};

const songSequence = (state = {}, action) => {
  switch (action.type) {
    case actions.SONG_SEQUENCE_SET:
      return action.sequence;
    default:
      return state;
  }
};

const startPoint = (state = '0', action) => {
  switch (action.type) {
    case actions.START_POINT_SET:
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
