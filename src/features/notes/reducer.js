import _ from 'lodash';
import { combineReducers } from 'redux';
import shortcuts from '../shortcuts';
import song from '../song';
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
    case shortcuts.actionTypes.DESELECT:
    case song.actionTypes.NOTES_DELETED:
    case song.actionTypes.SEQUENCE_CLOSED:
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
    case song.actionTypes.SEQUENCE_CLOSED:
      return [];
    default:
      return state;
  }
}

export default combineReducers({
  redos,
  selectedIds,
  undos,
});