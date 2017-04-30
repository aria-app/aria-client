import map from 'lodash/fp/map';
import omit from 'lodash/fp/omit';
import { createReducer } from 'redux-create-reducer';
import appData from '../../app-data';
import sequenceData from '../../sequence-data';
import shared from '../../shared';

const { setAtIds, translateNote } = shared.helpers;

const octaveDownDelta = { x: 0, y: 12 };
const octaveUpDelta = { x: 0, y: -12 };

export const noteDict = createReducer({}, {
  [appData.actions.SONG_LOADED]: (state, action) =>
    action.song.notes.dict,

  [sequenceData.actions.NOTE_DRAWN]: (state, action) => ({
    ...state,
    [action.note.id]: action.note,
  }),

  [sequenceData.actions.NOTE_ERASED]: (state, action) =>
    omit(action.note.id, state),

  [sequenceData.actions.NOTES_DELETED]: (state, action) =>
    omit(map('id', action.notes))(state),

  [sequenceData.actions.NOTES_DRAGGED]: (state, action) =>
    setAtIds(action.notes, state),

  [sequenceData.actions.NOTES_DUPLICATED]: (state, action) =>
    setAtIds(action.notes, state),

  [sequenceData.actions.NOTES_MOVED_OCTAVE_DOWN]: (state, action) =>
    setAtIds(map(
      translateNote(octaveDownDelta),
      action.notes,
    ), state),

  [sequenceData.actions.NOTES_MOVED_OCTAVE_UP]: (state, action) =>
    setAtIds(map(
      translateNote(octaveUpDelta),
      action.notes,
    ), state),

  [sequenceData.actions.NOTES_NUDGED]: (state, action) =>
    setAtIds(map(translateNote(
      action.delta),
      action.notes,
    ), state),

  [sequenceData.actions.NOTES_RESIZED]: (state, action) =>
    setAtIds(action.notes, state),
});
