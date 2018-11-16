import Dawww from 'dawww';
import filter from 'lodash/fp/filter';
import map from 'lodash/fp/map';
import omit from 'lodash/fp/omit';
import values from 'lodash/fp/values';
import { createReducer } from 'redux-create-reducer';
import shared from '../../shared';

const octaveDownDelta = { x: 0, y: 12 };
const octaveUpDelta = { x: 0, y: -12 };

export const notes = createReducer({}, {
  [shared.actions.SONG_LOADED]: (state, action) =>
    action.payload.song.notes,

  [shared.actions.NOTE_DRAWN]: (state, action) => {
    const note = Dawww.createNote(
      action.payload.sequence.id,
      [action.payload.point, { x: action.payload.point.x + 1, y: action.payload.point.y }],
    );

    return {
      ...state,
      [note.id]: note,
    };
  },

  [shared.actions.NOTE_ERASED]: (state, action) =>
    omit(action.payload.note.id, state),

  [shared.actions.NOTES_DELETED]: (state, action) =>
    omit(map('id', action.payload.notes), state),

  [shared.actions.NOTES_DRAGGED]: (state, action) =>
    Dawww.setAtIds(action.payload.notes, state),

  [shared.actions.NOTES_DUPLICATED]: (state, action) =>
    Dawww.setAtIds(action.payload.notes, state),

  [shared.actions.NOTES_MOVED_OCTAVE_DOWN]: (state, action) =>
    Dawww.setAtIds(map(
      Dawww.translateNote(octaveDownDelta),
      action.payload.notes,
    ), state),

  [shared.actions.NOTES_MOVED_OCTAVE_UP]: (state, action) =>
    Dawww.setAtIds(map(
      Dawww.translateNote(octaveUpDelta),
      action.payload.notes,
    ), state),

  [shared.actions.NOTES_NUDGED]: (state, action) =>
    Dawww.setAtIds(map(Dawww.translateNote(
      action.payload.delta),
    action.payload.notes,
    ), state),

  [shared.actions.NOTES_RESIZED]: (state, action) =>
    Dawww.setAtIds(action.payload.notes, state),

  [shared.actions.SEQUENCE_DUPLICATED]: (state, action) => {
    const isInSequence = note =>
      note.sequenceId === action.payload.originalSequence.id;
    const notesInSequence = filter(isInSequence, values(state));
    const duplicatedNotes = Dawww.duplicateNotes(notesInSequence);
    const notesWithNewSequenceId = duplicatedNotes.map(note => ({
      ...note,
      sequenceId: action.payload.duplicatedSequence.id,
    }));

    return Dawww.setAtIds(notesWithNewSequenceId, state);
  },
});
