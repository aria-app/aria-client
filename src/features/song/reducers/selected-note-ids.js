import { includes, map, without, uniq } from 'lodash/fp';
import { createReducer } from 'redux-create-reducer';
import sequenceData from '../../sequence-data';
import shared from '../../shared';
import shortcuts from '../../shortcuts';
import * as actions from '../actions';
import * as helpers from '../helpers';

const { DRAW, ERASE } = shared.constants.toolTypes;

const toggleInArray = x => xs =>
  (includes(x, xs) ? without(x, xs) : [...xs, x]);

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

  [sequenceData.actions.NOTE_SELECTED]: (state, action) =>
    (action.isAdditive
      ? toggleInArray(action.note.id, state)
      : uniq([...state, action.note.id])),

  [sequenceData.actions.NOTES_SELECTED_IN_AREA]: (state, action) => {
    const idsInArea = map('id', helpers.getNotesInArea(
      action.payload.startPoint,
      action.payload.endPoint,
      action.payload.notes,
    ));
    const selectedIds = map('id', action.payload.selectedNotes);

    return action.payload.isAdditive
      ? [...selectedIds, ...idsInArea]
      : idsInArea;
  },

  [sequenceData.actions.SEQUENCE_CLOSED]: () =>
    [],

  [shortcuts.actions.DESELECT]: () =>
    [],
});
