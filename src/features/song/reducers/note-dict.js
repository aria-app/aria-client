import { map, omit } from 'lodash/fp';
import { createReducer } from 'redux-create-reducer';
import sequenceData from '../../sequence-data';
import shared from '../../shared';
import * as actions from '../actions';

const { setAtIds } = shared.helpers;

export const noteDict = createReducer({}, {
  [actions.NOTES_ADDED]: (state, action) =>
    setAtIds(action.notes, state),

  [actions.NOTES_MOVE_SUCCEEDED]: (state, action) =>
    setAtIds(action.notes, state),

  [actions.NOTES_RESIZE_SUCCEEDED]: (state, action) =>
    setAtIds(action.notes, state),

  [actions.NOTES_DELETED]: (state, action) =>
    omit(map('id')(action.notes))(state),

  [sequenceData.actions.NOTES_DELETED]: (state, action) =>
    omit([action.note.id])(state),

  [actions.NOTES_SET]: (state, action) =>
    setAtIds(action.notes, state),

  [actions.SONG_LOADED]: (state, action) =>
    action.song.notes.dict,
});
