import { combineReducers } from 'redux';
import * as actionTypes from '../action-types';
import notes from './notes';
import sequences from './sequences';
import tracks from './tracks';

const activeSequenceId = (state = '', action) => {
  switch (action.type) {
    case actionTypes.CLOSE_SEQUENCE:
      return '';
    case actionTypes.OPEN_SEQUENCE:
      return action.id;
    default:
      return state;
  }
};

const bpm = (state = 0, action) => {
  switch (action.type) {
    case actionTypes.LOAD_SONG:
      return action.song.bpm;
    case actionTypes.SET_BPM:
      return action.bpm;
    default:
      return state;
  }
};

const id = (state = '', action) => {
  switch (action.type) {
    case actionTypes.LOAD_SONG:
      return action.song.id;
    case actionTypes.SET_ID:
      return action.id;
    default:
      return state;
  }
};

const measureCount = (state = 1, action) => {
  switch (action.type) {
    case actionTypes.DECREMENT_MEASURE_COUNT:
      return state > 1 ? state - 1 : state;
    case actionTypes.INCREMENT_MEASURE_COUNT:
      return state + 1;
    case actionTypes.LOAD_SONG:
      return action.song.measureCount;
    case actionTypes.SET_MEASURE_COUNT:
      return action.measureCount;
    default:
      return state;
  }
};

const name = (state = 0, action) => {
  switch (action.type) {
    case actionTypes.LOAD_SONG:
      return action.song.name;
    case actionTypes.SET_NAME:
      return action.name;
    default:
      return state;
  }
};

export default combineReducers({
  activeSequenceId,
  notes,
  sequences,
  bpm,
  id,
  measureCount,
  name,
  tracks,
});
