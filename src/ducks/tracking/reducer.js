import { combineReducers } from 'redux';
import song from 'ducks/song';
import * as actionTypes from './action-types';

function redos(state = [], action) {
  switch (action.type) {
    case actionTypes.SET_REDOS:
      return action.redos;
    default:
      return state;
  }
}

const selectedSequenceId = (state = '', action) => {
  switch (action.type) {
    case actionTypes.DELETE_SEQUENCE:
    case actionTypes.DESELECT_SEQUENCE:
    case song.actionTypes.OPEN_SEQUENCE:
      return '';
    case actionTypes.SELECT_SEQUENCE:
      return action.id;
    default:
      return state;
  }
};

const stagedTrackId = (state = '', action) => {
  switch (action.type) {
    case actionTypes.TRACK_EDITING_FINISHED:
      return {};
    case actionTypes.TRACK_EDITING_STARTED:
      return action.id;
    default:
      return state;
  }
};

function undos(state = [], action) {
  switch (action.type) {
    case actionTypes.SET_UNDOS:
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
