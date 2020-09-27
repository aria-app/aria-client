import { combineReducers } from 'redux';
import undoable, { includeAction } from 'redux-undo';

import { reducerManager } from '../../../store';
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

const songReducer = undoable(rootReducer, {
  clearHistoryType: [
    shared.actions.routeNotesEditorLoaded.type,
    shared.actions.routeSongEditorLoaded.type,
  ],
  filter: includeAction(actions.undoableActions),
  redoType: actions.redoRequested.type,
  syncFilter: true,
  undoType: actions.undoRequested.type,
});

reducerManager.add('song', songReducer);

export default songReducer;
