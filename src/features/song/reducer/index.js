import { combineReducers } from 'redux';
import undoable, { includeAction } from 'redux-undo';
import shared from '../../shared';
import { bpm } from './bpm';
import { id } from './id';
import { measureCount } from './measureCount';
import { name } from './name';
import { notes } from './notes';
import { sequences } from './sequences';
import { tracks } from './tracks';

const rootReducer = combineReducers({
  bpm,
  id,
  measureCount,
  name,
  notes,
  sequences,
  tracks,
});

export default undoable(rootReducer, {
  filter: includeAction([
    shared.actions.BPM_SET,
    shared.actions.MEASURE_COUNT_SET,
    shared.actions.NOTE_DRAWN,
    shared.actions.NOTE_ERASED,
    shared.actions.NOTES_DELETED,
    shared.actions.NOTES_DRAGGED,
    shared.actions.NOTES_DUPLICATED,
    shared.actions.NOTES_MOVED_OCTAVE_DOWN,
    shared.actions.NOTES_MOVED_OCTAVE_UP,
    shared.actions.NOTES_NUDGED,
    shared.actions.NOTES_RESIZED,
    shared.actions.SEQUENCE_ADDED,
    shared.actions.SEQUENCE_DELETED,
    shared.actions.SEQUENCE_DUPLICATED,
    shared.actions.SEQUENCE_EDITED,
    shared.actions.SEQUENCE_EXTENDED,
    shared.actions.SEQUENCE_NUDGED_LEFT,
    shared.actions.SEQUENCE_NUDGED_RIGHT,
    shared.actions.SEQUENCE_SHORTENED,
    shared.actions.SONG_EXTENDED,
    shared.actions.SONG_SHORTENED,
    shared.actions.TRACK_ADDED,
    shared.actions.TRACK_DELETED,
    shared.actions.TRACK_IS_MUTED_TOGGLED,
    shared.actions.TRACK_IS_SOLOING_TOGGLED,
    shared.actions.TRACK_VOICE_SET,
    shared.actions.TRACK_VOLUME_SET,
  ]),
  initTypes: [
    '@@redux-undo/INIT',
    shared.actions.INITIALIZED,
    shared.actions.SEQUENCE_FOCUSED,
    shared.actions.SONG_FOCUSED,
  ],
  redoType: shared.actions.REDO_REQUESTED,
  undoType: shared.actions.UNDO_REQUESTED,
})
