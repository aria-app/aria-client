import { combineReducers } from 'redux';
import undoable, { includeAction } from 'redux-undo';
import shared from '../../shared';
import * as actions from '../actions';
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
    shared.actions.ROUTE_NOTES_EDITOR_LOADED,
    shared.actions.ROUTE_SONG_EDITOR_LOADED,
  ] as unknown) as string,
  filter: includeAction(actions.undoableActions),
  redoType: actions.redoRequested.type,
  syncFilter: true,
  undoType: actions.undoRequested.type,
});
