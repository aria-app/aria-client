import _ from 'lodash';
import { combineReducers } from 'redux';
import * as actionTypes from '../action-types';
import shared from '../../shared';
import notes from './notes';
import sequences from './sequences';
import tracks from './tracks';

const activeSequenceId = (state = '', action) => {
  switch (action.type) {
    case actionTypes.SEQUENCE_CLOSED:
      return '';
    case actionTypes.SEQUENCE_OPENED:
      return action.id;
    default:
      return state;
  }
};

const bpm = (state = 120, action) => {
  switch (action.type) {
    case actionTypes.BPM_SET:
      return clampBpm(action.bpm);
    case actionTypes.SONG_LOADED:
      return action.song.bpm;
    default:
      return state;
  }
};

const id = (state = '', action) => {
  switch (action.type) {
    case actionTypes.ID_SET:
      return action.id;
    case actionTypes.SONG_LOADED:
      return action.song.id;
    default:
      return state;
  }
};

const measureCount = (state = 1, action) => {
  switch (action.type) {
    case actionTypes.MEASURE_COUNT_SET:
      return action.measureCount;
    case actionTypes.SONG_EXTENDED:
      return state + 1;
    case actionTypes.SONG_LOADED:
      return action.song.measureCount;
    case actionTypes.SONG_SHORTENED:
      return state > 1 ? state - 1 : state;
    default:
      return state;
  }
};

const name = (state = '', action) => {
  switch (action.type) {
    case actionTypes.NAME_SET:
      return action.name;
    case actionTypes.SONG_LOADED:
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

function clampBpm(bpmValue) {
  return _.clamp(bpmValue, shared.constants.minBPM, shared.constants.maxBPM);
}
