import last from 'lodash/fp/last';
import map from 'lodash/fp/map';
import omit from 'lodash/fp/omit';
import { createReducer } from 'redux-create-reducer';
import appData from '../../app-data';
import sequenceData from '../../sequence-data';
import shared from '../../shared';
import * as helpers from '../helpers';

const { setAtIds } = shared.helpers;

export const noteDict = createReducer({}, {
  [appData.actions.SONG_LOADED]: (state, action) =>
    action.payload.notes.dict,

  [sequenceData.actions.NOTE_DRAWN]: (state, action) => ({
    ...state,
    [action.payload.note.id]: action.payload.note,
  }),

  [sequenceData.actions.NOTE_ERASED]: (state, action) =>
    omit(action.payload.note.id, state),

  [sequenceData.actions.NOTES_DELETED]: (state, action) =>
    omit(action.ids)(state),

  [sequenceData.actions.NOTES_DRAGGED]: (state, action) =>
    setAtIds(action.notes, state),

  [sequenceData.actions.NOTES_DUPLICATED]: (state, action) =>
    setAtIds(action.notes, state),

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

  [sequenceData.actions.NOTES_NUDGED]: (state, action) =>
    setAtIds(map(id => ({
      ...state[id],
      points: state[id].points.map(helpers.addPoints(action.delta)),
    }), action.ids), state),

  [sequenceData.actions.NOTES_RESIZED]: (state, action) =>
    setAtIds(action.notes, state),
});
