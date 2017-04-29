import curry from 'lodash/fp/curry';
import includes from 'lodash/fp/includes';
import map from 'lodash/fp/map';
import without from 'lodash/fp/without';
import { createReducer } from 'redux-create-reducer';
import sequenceData from '../../sequence-data';
import shared from '../../shared';
import * as helpers from '../helpers';

const { DRAW, ERASE } = shared.constants.toolTypes;

const toggleInArray = curry((x, xs) =>
  (includes(x, xs) ? without([x], xs) : [...xs, x]));

export const selectedNoteIds = createReducer([], {
  [sequenceData.actions.NOTE_ERASED]: () =>
    [],

  [sequenceData.actions.NOTE_SELECTED]: (state, action) =>
    (action.isAdditive
      ? toggleInArray(action.note.id, state)
      : [action.note.id]),

  [sequenceData.actions.NOTES_ALL_DESELECTED]: () =>
    [],

  [sequenceData.actions.NOTES_ALL_SELECTED]: (state, action) =>
    map('id', action.notes),

  [sequenceData.actions.NOTES_DELETED]: () =>
    [],

  [sequenceData.actions.NOTES_DUPLICATED]: (state, action) =>
    map('id', action.notes),

  [sequenceData.actions.NOTES_SELECTED_IN_AREA]: (state, action) => {
    const idsInArea = map('id', helpers.getNotesInArea(
      action.startPoint,
      action.endPoint,
      action.notes,
    ));
    const selectedIds = map('id', action.selectedNotes);

    return action.isAdditive
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
