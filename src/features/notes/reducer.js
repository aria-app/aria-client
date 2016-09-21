import _ from 'lodash';
import { combineReducers } from 'redux';
import shortcuts from '../shortcuts';
import song from '../song';
import * as actions from './actions';

function redos(state = [], action) {
  switch (action.type) {
    case actions.REDOS_SET:
      return action.redos;
    default:
      return state;
  }
}

function selectedIds(state = [], action) {
  switch (action.type) {
    case actions.ALL_NOTES_DESELECTED:
    case shortcuts.actions.DESELECT:
    case song.actions.NOTES_DELETED:
    case song.actions.SEQUENCE_CLOSED:
      return [];
    case actions.NOTE_SELECTED:
      if (action.isAdditive) {
        return _.includes(state, action.note.id)
          ? _.without(state, action.note.id)
          : [...state, action.note.id];
      }
      return !_.includes(state, action.note.id)
        ? [action.note.id]
        : state;
    case actions.NOTES_SELECTED:
      return _.map(action.notes, 'id');
    default:
      return state;
  }
}

function undos(state = [], action) {
  switch (action.type) {
    case actions.UNDOS_SET:
      return action.undos;
    case song.actions.SEQUENCE_CLOSED:
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
