import difference from 'lodash/fp/difference';
import map from 'lodash/fp/map';
import without from 'lodash/fp/without';
import { createReducer } from 'redux-create-reducer';
import sequenceData from '../../sequence-data';
import * as actions from '../actions';

export const noteIds = createReducer([], {
  [actions.NOTES_ADDED]: (state, action) =>
    [...state, map('id')(action.notes)],

  [actions.NOTES_DELETED]: (state, action) =>
    difference(state)(map('id')(action.notes)),

  [actions.NOTES_SET]: (state, action) =>
    map('id')(action.notes),

  [actions.SONG_LOADED]: (state, action) =>
    action.song.notes.ids,

  [sequenceData.actions.NOTE_DRAWN]: (state, action) =>
    [...state, action.payload.note.id],

  [sequenceData.actions.NOTE_ERASED]: (state, action) =>
    without(state)(action.payload.note.id),

  [sequenceData.actions.NOTES_DELETED]: (state, action) =>
    difference(state)(map('id')(action.payload.notes)),
});
