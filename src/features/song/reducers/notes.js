import { concat, difference, includes, map, omit, without } from 'lodash/fp';
import { combineReducers } from 'redux';
import shared from '../../shared';
import shortcuts from '../../shortcuts';
import * as actions from '../actions';

const { setAtIds } = shared.helpers;

const dict = (state = {}, action) => {
  switch (action.type) {
    case actions.NOTES_ADDED:
    case actions.NOTES_UPDATED:
      return setAtIds(action.notes, state);
    case actions.NOTES_DELETED:
      return omit(action.ids)(state);
    case actions.NOTES_SET:
      return setAtIds(action.notes, state);
    case actions.SONG_LOADED:
      return action.song.notes.dict;
    default:
      return state;
  }
};

const ids = (state = [], action) => {
  switch (action.type) {
    case actions.NOTES_ADDED:
      return concat(state)(map('id')(action.notes));
    case actions.NOTES_DELETED:
      return difference(state)(action.ids);
    case actions.NOTES_SET:
      return map('id')(action.notes);
    case actions.SONG_LOADED:
      return action.song.notes.ids;
    default:
      return state;
  }
};

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
    case actions.SOME_NOTES_DELETED:
    case actions.SEQUENCE_CLOSED:
      return [];
    case actions.NOTE_SELECTED:
      if (action.isAdditive) {
        return includes(action.note.id)(state)
          ? without([action.note.id])(state)
          : [...state, action.note.id];
      }
      return !includes(action.note.id)(state)
        ? [action.note.id]
        : state;
    case actions.NOTES_SELECTED:
      return map('id')(action.notes);
    default:
      return state;
  }
}

function undos(state = [], action) {
  switch (action.type) {
    case actions.UNDOS_SET:
      return action.undos;
    case actions.SEQUENCE_CLOSED:
      return [];
    default:
      return state;
  }
}

export default combineReducers({
  dict,
  ids,
  redos,
  selectedIds,
  undos,
});
