import { clamp } from 'lodash/fp';
import { combineReducers } from 'redux';
import * as actions from '../actions';
import shared from '../../shared';
import notes from './notes';
import sequences from './sequences';
import tracks from './tracks';

const clampBpm = bpmValue =>
  clamp(shared.constants.minBPM, shared.constants.maxBPM)(bpmValue);

const activeSequenceId = (state = '', action) => {
  switch (action.type) {
    case actions.SONG_LOADED:
      return action.song.activeSequenceId;
    case actions.SEQUENCE_CLOSED:
      return '';
    case actions.SEQUENCE_OPENED:
      return action.id;
    default:
      return state;
  }
};

const bpm = (state = 120, action) => {
  switch (action.type) {
    case actions.BPM_SET:
      return clampBpm(action.bpm);
    case actions.SONG_LOADED:
      return action.song.bpm;
    default:
      return state;
  }
};

const id = (state = '', action) => {
  switch (action.type) {
    case actions.ID_SET:
      return action.id;
    case actions.SONG_LOADED:
      return action.song.id;
    default:
      return state;
  }
};

const measureCount = (state = 1, action) => {
  switch (action.type) {
    case actions.MEASURE_COUNT_SET:
      return action.measureCount;
    case actions.SONG_EXTENDED:
      return state + 1;
    case actions.SONG_LOADED:
      return action.song.measureCount;
    case actions.SONG_SHORTENED:
      return state > 1 ? state - 1 : state;
    default:
      return state;
  }
};

const name = (state = '', action) => {
  switch (action.type) {
    case actions.NAME_SET:
      return action.name;
    case actions.SONG_LOADED:
      return action.song.name;
    default:
      return state;
  }
};

export const indexReducer = combineReducers({
  activeSequenceId,
  bpm,
  id,
  measureCount,
  name,
});

export default combineReducers({
  activeSequenceId,
  bpm,
  id,
  measureCount,
  name,
  notes,
  sequences,
  tracks,
});
