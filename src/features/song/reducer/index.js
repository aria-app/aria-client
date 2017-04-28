import { combineReducers } from 'redux';
import { activeSequenceId } from './active-sequence-id';
import { bpm } from './bpm';
import { id } from './id';
import { measureCount } from './measure-count';
import { name } from './name';
import { noteDict } from './note-dict';
import { noteIds } from './note-ids';
import { selectedNoteIds } from './selected-note-ids';
import { sequenceDict } from './sequence-dict';
import { sequenceIds } from './sequence-ids';
import { trackDict } from './track-dict';
import { trackIds } from './track-ids';

export default combineReducers({
  activeSequenceId,
  bpm,
  id,
  measureCount,
  name,
  noteDict,
  noteIds,
  selectedNoteIds,
  sequenceDict,
  sequenceIds,
  trackDict,
  trackIds,
});
