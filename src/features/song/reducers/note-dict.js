import last from 'lodash/fp/last';
import map from 'lodash/fp/map';
import omit from 'lodash/fp/omit';
import { createReducer } from 'redux-create-reducer';
import sequenceData from '../../sequence-data';
import shared from '../../shared';
import * as actions from '../actions';
import * as helpers from '../helpers';

const { setAtIds } = shared.helpers;

export const noteDict = createReducer({}, {
  [actions.NOTES_ADDED]: (state, action) =>
    setAtIds(action.notes, state),

  [actions.NOTES_DELETED]: (state, action) =>
    omit(map('id')(action.notes))(state),

  [actions.NOTES_MOVE_SUCCEEDED]: (state, action) =>
    setAtIds(action.notes, state),

  [actions.NOTES_SET]: (state, action) =>
    setAtIds(action.notes, state),

  [actions.SONG_LOADED]: (state, action) =>
    action.song.notes.dict,

  [sequenceData.actions.NOTE_DRAWN]: (state, action) => ({
    ...state,
    [action.payload.note.id]: action.payload.note,
  }),

  [sequenceData.actions.NOTE_ERASED]: (state, action) =>
    omit(action.payload.note.id, state),

  [sequenceData.actions.NOTES_DELETED]: (state, action) =>
    omit(map('id')(action.payload.notes))(state),

  [sequenceData.actions.NOTES_DRAGGED]: (state, action) =>
    setAtIds(map(note => ({
      ...note,
      points: note.points.map(helpers.addPoints(action.payload.delta)),
    }), action.payload.notes), state),

  [sequenceData.actions.NOTES_MOVED_OCTAVE_DOWN]: (state, action) =>
    setAtIds(map(note => ({
      ...note,
      points: note.points.map(helpers.addPoints({
        x: 0,
        y: 12,
      })),
    }), action.payload.notes), state),

  [sequenceData.actions.NOTES_MOVED_OCTAVE_UP]: (state, action) =>
    setAtIds(map(note => ({
      ...note,
      points: note.points.map(helpers.addPoints({
        x: 0,
        y: -12,
      })),
    }), action.payload.notes), state),

  [sequenceData.actions.NOTES_RESIZED]: (state, action) =>
    setAtIds(map(note => ({
      ...note,
      points: [
        ...note.points.slice(0, note.points.length - 1),
        helpers.addPoints(action.payload.delta)(last(note.points)),
      ],
    }), action.payload.notes), state),
});
