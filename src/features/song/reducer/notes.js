import map from 'lodash/fp/map';
import omit from 'lodash/fp/omit';
import { createReducer } from 'redux-create-reducer';
import shared from '../../shared';

const { setAtIds, translateNote } = shared.helpers;

const octaveDownDelta = { x: 0, y: 12 };
const octaveUpDelta = { x: 0, y: -12 };

export const notes = createReducer({}, {
  [shared.actions.SONG_LOADED]: (state, action) =>
    action.song.notes,

  [shared.actions.NOTE_DRAWN]: (state, action) => {
    const note = shared.helpers.createNote({
      points: [action.point, { x: action.point.x + 1, y: action.point.y }],
      sequenceId: action.sequence.id,
    });

    return {
      ...state,
      [note.id]: note,
    };
  },

  [shared.actions.NOTE_ERASED]: (state, action) =>
    omit(action.note.id, state),

  [shared.actions.NOTES_DELETED]: (state, action) =>
    omit(map('id', action.notes), state),

  [shared.actions.NOTES_DRAGGED]: (state, action) =>
    setAtIds(action.notes, state),

  [shared.actions.NOTES_DUPLICATED]: (state, action) =>
    setAtIds(action.notes, state),

  [shared.actions.NOTES_MOVED_OCTAVE_DOWN]: (state, action) =>
    setAtIds(map(
      translateNote(octaveDownDelta),
      action.notes,
    ), state),

  [shared.actions.NOTES_MOVED_OCTAVE_UP]: (state, action) =>
    setAtIds(map(
      translateNote(octaveUpDelta),
      action.notes,
    ), state),

  [shared.actions.NOTES_NUDGED]: (state, action) =>
    setAtIds(map(translateNote(
      action.delta),
    action.notes,
    ), state),

  [shared.actions.NOTES_RESIZED]: (state, action) =>
    setAtIds(action.notes, state),
});
