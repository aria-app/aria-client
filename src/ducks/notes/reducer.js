import _ from 'lodash';
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

function selectedIds(state = [], action) {
  switch (action.type) {
    case actionTypes.DESELECT_ALL:
    case song.actionTypes.DELETE_NOTES:
    case song.actionTypes.OPEN_SEQUENCE:
      return [];
    case actionTypes.SELECT_NOTE:
      if (action.isAdditive) {
        return _.includes(state, action.note.id)
          ? _.without(state, action.note.id)
          : [...state, action.note.id];
      }
      return !_.includes(state, action.note.id)
        ? [action.note.id]
        : state;
    case actionTypes.SELECT_NOTES:
      return _.map(action.notes, 'id');
    default:
      return state;
  }
}

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
  selectedIds,
  undos,
});
