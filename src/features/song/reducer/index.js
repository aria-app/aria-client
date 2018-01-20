import { combineReducers } from 'redux';
import { activeSequenceId } from './activeSequenceId';
import { bpm } from './bpm';
import { id } from './id';
import { measureCount } from './measureCount';
import { name } from './name';
import { notes } from './notes';
import { selectedNoteIds } from './selectedNoteIds';
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
