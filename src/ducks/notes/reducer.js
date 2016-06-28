import _ from 'lodash';
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

function selectedIds(state = [], action) {
  switch (action.type) {
    case actionTypes.ALL_NOTES_DESELECTED:
    case song.actionTypes.NOTES_DELETED:
    case song.actionTypes.SEQUENCE_OPENED:
      return [];
    case actionTypes.NOTE_SELECTED:
      if (action.isAdditive) {
        return _.includes(state, action.note.id)
          ? _.without(state, action.note.id)
          : [...state, action.note.id];
      }
      return !_.includes(state, action.note.id)
        ? [action.note.id]
        : state;
    case actionTypes.NOTES_SELECTED:
      return _.map(action.notes, 'id');
    default:
      return state;
  }
}

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
  selectedIds,
  undos,
});
