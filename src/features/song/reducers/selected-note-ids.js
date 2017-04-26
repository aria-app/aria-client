import { includes, map, without } from 'lodash/fp';
import { createReducer } from 'redux-create-reducer';
import sequenceData from '../../sequence-data';
import shared from '../../shared';
import * as helpers from '../helpers';

const { DRAW, ERASE } = shared.constants.toolTypes;

const toggleInArray = x => xs =>
  (includes(x, xs) ? without(x, xs) : [...xs, x]);

export const selectedNoteIds = createReducer([], {
  [sequenceData.actions.NOTE_DRAWN]: (state, action) =>
    [action.payload.note.id],

  [sequenceData.actions.NOTE_ERASED]: () =>
    [],

  [sequenceData.actions.NOTE_SELECTED]: (state, action) =>
    (action.payload.isAdditive
      ? toggleInArray(action.payload.note.id)(state)
      : [action.payload.note.id]),

  [sequenceData.actions.NOTES_ALL_DESELECTED]: () =>
    [],

  [sequenceData.actions.NOTES_ALL_SELECTED]: (state, action) =>
    action.ids,

  [sequenceData.actions.NOTES_DELETED]: () =>
    [],

  [sequenceData.actions.NOTES_DUPLICATED]: (state, action) =>
    map('id', action.notes),

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

  [sequenceData.actions.TOOL_SELECTED]: (state, action) =>
    (includes(action.toolType, [DRAW, ERASE])
      ? []
      : state),
});
