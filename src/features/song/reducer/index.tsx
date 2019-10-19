import { combineReducers } from 'redux';
import undoable, { includeAction } from 'redux-undo';
import shared from '../../shared';
import bpm from './bpm';
import id from './id';
import measureCount from './measureCount';
import name from './name';
import notes from './notes';
import sequences from './sequences';
import syncState from './syncState';
import tracks from './tracks';
import userId from './userId';

const rootReducer = combineReducers({
  bpm: bpm.reducer,
  id: id.reducer,
  measureCount: measureCount.reducer,
  name: name.reducer,
  notes: notes.reducer,
  sequences: sequences.reducer,
  syncState: syncState.reducer,
  tracks: tracks.reducer,
  userId: userId.reducer,
});

export default undoable(rootReducer, {
  // Casting this as the typings are incorrect
  clearHistoryType: ([
    shared.actions.NOTES_EDITOR_LOADED,
    shared.actions.SONG_EDITOR_LOADED,
  ] as unknown) as string,
  filter: includeAction(shared.actions.undoableActions),
  redoType: shared.actions.REDO_REQUESTED,
  syncFilter: true,
  undoType: shared.actions.UNDO_REQUESTED,
});
