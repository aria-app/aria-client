import curry from 'lodash/fp/curry';
import includes from 'lodash/fp/includes';
import map from 'lodash/fp/map';
import without from 'lodash/fp/without';
import { createReducer } from 'redux-create-reducer';
import shared from '../../shared';

const { getNotesInArea } = shared.helpers;

const toggleInArray = curry((x, xs) =>
  (includes(x, xs) ? without([x], xs) : [...xs, x]));

export const selectedNoteIds = createReducer([], {
  [shared.actions.NOTE_ERASED]: () =>
    [],

  [shared.actions.NOTE_SELECTED]: (state, action) =>
    (action.isAdditive
      ? toggleInArray(action.note.id, state)
      : [action.note.id]),

  [shared.actions.NOTES_ALL_DESELECTED]: () =>
    [],

  [shared.actions.NOTES_ALL_SELECTED]: (state, action) =>
    map('id', action.notes),

  [shared.actions.NOTES_DELETED]: () =>
    [],

  [shared.actions.NOTES_DUPLICATED]: (state, action) =>
    map('id', action.notes),

  [shared.actions.NOTES_SELECTED_IN_AREA]: (state, action) => {
    const idsInArea = map('id', getNotesInArea(
      action.startPoint,
      action.endPoint,
      action.notes,
    ));
    const selectedIds = map('id', action.selectedNotes);

    return action.isAdditive
      ? [...selectedIds, ...idsInArea]
      : idsInArea;
  },

  [shared.actions.SEQUENCE_CLOSED]: () =>
    [],
});
