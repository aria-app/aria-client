import difference from 'lodash/fp/difference';
import map from 'lodash/fp/map';
import without from 'lodash/fp/without';
import { createReducer } from 'redux-create-reducer';
import appData from '../../app-data';
import sequenceData from '../../sequence-data';

export const noteIds = createReducer([], {
  [appData.actions.SONG_LOADED]: (state, action) =>
    action.payload.notes.ids,

  [sequenceData.actions.NOTE_DRAWN]: (state, action) =>
    [...state, action.payload.note.id],

  [sequenceData.actions.NOTE_ERASED]: (state, action) =>
    without(state)(action.payload.note.id),

  [sequenceData.actions.NOTES_DELETED]: (state, action) =>
    difference(state)(action.ids),

  [sequenceData.actions.NOTES_DUPLICATED]: (state, action) =>
    [...state, ...map('id', action.notes)],
});
