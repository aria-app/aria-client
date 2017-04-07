import { concat, difference, map } from 'lodash/fp';
import { createReducer } from 'redux-create-reducer';
import sequenceData from '../../sequence-data';
import * as actions from '../actions';

export const noteIds = createReducer([], {
  [actions.NOTES_ADDED]: (state, action) =>
    concat(state)(map('id')(action.notes)),

  [actions.NOTES_DELETED]: (state, action) =>
    difference(state)(map('id')(action.notes)),

  [actions.NOTES_SET]: (state, action) =>
    map('id')(action.notes),

  [actions.SONG_LOADED]: (state, action) =>
    action.song.notes.ids,

  [sequenceData.actions.NOTE_DRAWN]: (state, action) =>
    concat(state)(action.payload.id),
});
