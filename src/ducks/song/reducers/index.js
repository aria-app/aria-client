import { combineReducers } from 'redux';
import * as actionTypes from '../action-types';
import notes from './notes';
import sequences from './sequences';
import song from './song';
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

export default combineReducers({
  activeSequenceId,
  notes,
  sequences,
  song,
  tracks,
});
