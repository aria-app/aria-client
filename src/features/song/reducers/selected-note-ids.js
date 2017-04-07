import { includes, map, without } from 'lodash/fp';
import { createReducer } from 'redux-create-reducer';
import sequenceData from '../../sequence-data';
import shared from '../../shared';
import shortcuts from '../../shortcuts';
import * as actions from '../actions';

const { DRAW, ERASE } = shared.constants.toolTypes;

export const selectedNoteIds = createReducer([], {
  [actions.NOTES_DELETED]: () =>
    [],

  [actions.NOTES_DESELECTED]: () =>
    [],

  [actions.NOTES_ADDED]: (state, action) =>
    map('id')(action.notes),

  [actions.NOTES_SELECTED]: (state, action) =>
    map('id')(action.notes),

  [sequenceData.actions.TOOL_SELECTED]: (state, action) =>
    (includes(action.toolType, [DRAW, ERASE]) ? [] : state),

  [sequenceData.actions.NOTE_SELECTED]:
    handleNoteSelected,

  [sequenceData.actions.SEQUENCE_CLOSED]: () =>
    [],

  [shortcuts.actions.DESELECT]: () =>
    [],
});

function handleNoteSelected(state, action) {
  if (action.isAdditive) {
    return includes(action.note.id)(state)
      ? without([action.note.id])(state)
      : [...state, action.note.id];
  }
  return !includes(action.note.id)(state)
    ? [action.note.id]
    : state;
}
