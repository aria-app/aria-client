import { concat, difference, map } from 'lodash/fp';
import { createReducer } from 'redux-create-reducer';
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
});
