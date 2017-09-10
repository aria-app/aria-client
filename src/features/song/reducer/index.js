import { combineReducers } from 'redux';
import { activeSequenceId } from './active-sequence-id';
import { bpm } from './bpm';
import { id } from './id';
import { measureCount } from './measure-count';
import { name } from './name';
import { notes } from './notes';
import { selectedNoteIds } from './selected-note-ids';
import { sequences } from './sequences';
import { tracks } from './tracks';

export default combineReducers({
  activeSequenceId,
  bpm,
  id,
  measureCount,
  name,
  notes,
  selectedNoteIds,
  sequences,
  tracks,
});
