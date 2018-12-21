import { combineReducers } from 'redux';
import undoable, { includeAction } from 'redux-undo';
import shared from '../../shared';
import { bpm } from './bpm';
import { id } from './id';
import { measureCount } from './measureCount';
import { name } from './name';
import { notes } from './notes';
import { sequences } from './sequences';
import { songs } from './songs';
import { syncState } from './syncState';
import { tracks } from './tracks';
import { userId } from './userId';

const rootReducer = combineReducers({
  bpm,
  id,
  measureCount,
  name,
  notes,
  sequences,
  songs,
  syncState,
  tracks,
  userId,
});

export default undoable(rootReducer, {
  clearHistoryType: [
    shared.actions.SEQUENCE_EDITOR_LOADED,
    shared.actions.SONG_EDITOR_LOADED,
  ],
  filter: includeAction(shared.actions.undoableActions),
  redoType: shared.actions.REDO_REQUESTED,
  syncFilter: true,
  undoType: shared.actions.UNDO_REQUESTED,
})
