import { combineReducers } from 'redux';
import undoable, { includeAction } from 'redux-undo';
import shared from '../../shared';
import { sequences } from './sequences';
import { tracks } from './tracks';

export default undoable(combineReducers({
  sequences,
  tracks,
}), {
  filter: includeAction([
    shared.actions.SEQUENCE_ADDED,
    shared.actions.SEQUENCE_DELETED,
    shared.actions.SEQUENCE_DUPLICATED,
    shared.actions.SEQUENCE_EDITED,
    shared.actions.SEQUENCE_EXTENDED,
    shared.actions.SEQUENCE_NUDGED_LEFT,
    shared.actions.SEQUENCE_NUDGED_RIGHT,
    shared.actions.SEQUENCE_SHORTENED,
    shared.actions.TRACK_ADDED,
    shared.actions.TRACK_DELETED,
    shared.actions.TRACK_IS_MUTED_TOGGLED,
    shared.actions.TRACK_IS_SOLOING_TOGGLED,
    shared.actions.TRACK_VOICE_SET,
    shared.actions.TRACK_VOLUME_SET,
  ]),
  initTypes: [
    '@@redux-undo/INIT',
    shared.actions.SEQUENCER_LOADED,
    shared.actions.TRACKER_LOADED,
  ],
  redoType: shared.actions.TRACKS_REDO_REQUESTED,
  undoType: shared.actions.TRACKS_UNDO_REQUESTED,
});
