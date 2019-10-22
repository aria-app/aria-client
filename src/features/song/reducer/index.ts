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
  bpm,
  id,
  measureCount,
  name,
  notes,
  sequences,
  syncState,
  tracks,
  userId,
});

export default undoable(rootReducer, {
  // Casting this as the typings are incorrect
  clearHistoryType: ([
    shared.actions.routeNotesEditorLoaded.type,
    shared.actions.routeSongEditorLoaded.type,
  ] as unknown) as string,
  filter: includeAction(actions.undoableActions),
  redoType: actions.redoRequested.type,
  syncFilter: true,
  undoType: actions.undoRequested.type,
});
