import { combineReducers } from 'redux';
import { activeSequenceId } from './active-sequence-id';
import { bpm } from './bpm';
import { id } from './id';
import { measureCount } from './measure-count';
import { name } from './name';
import { noteDict } from './note-dict';
import { noteIds } from './note-ids';
import { redos } from './redos';
import { selectedNoteIds } from './selected-note-ids';
import { sequenceDict } from './sequence-dict';
import { sequenceIds } from './sequence-ids';
import { trackDict } from './track-dict';
import { trackIds } from './track-ids';
import { undos } from './undos';

export default combineReducers({
  activeSequenceId,
  bpm,
  id,
  measureCount,
  name,
  noteDict,
  noteIds,
  redos,
  selectedNoteIds,
  sequenceDict,
  sequenceIds,
  trackDict,
  trackIds,
  undos,
});
