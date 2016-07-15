import { combineReducers } from 'redux';
import song from 'ducks/song';
import * as actionTypes from './action-types';

function redos(state = [], action) {
  switch (action.type) {
    case actionTypes.REDOS_SET:
      return action.redos;
    default:
      return state;
  }
}

const selectedSequenceId = (state = '', action) => {
  switch (action.type) {
    case actionTypes.SEQUENCE_DELETED:
    case actionTypes.SEQUENCE_DESELECTED:
    case song.actionTypes.SEQUENCE_OPENED:
      return '';
    case actionTypes.SEQUENCE_SELECTED:
      return action.id;
    default:
      return state;
  }
};

const stagedTrackId = (state = '', action) => {
  switch (action.type) {
    case actionTypes.TRACK_EDITING_FINISHED:
      return '';
    case actionTypes.TRACK_EDITING_STARTED:
      return action.id;
    default:
      return state;
  }
};

function undos(state = [], action) {
  switch (action.type) {
    case actionTypes.UNDOS_SET:
      return action.undos;
    default:
      return state;
  }
}

export default combineReducers({
  redos,
  selectedSequenceId,
  stagedTrackId,
  undos,
});
