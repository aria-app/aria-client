import { connect } from 'react-redux';
import song from '../../../song';
import sequenceData from '../../../sequence-data';
import * as selectors from '../../selectors';
import { Notes } from './notes';

export const NotesContainer = connect(state => ({
  measureCount: song.selectors.getActiveSequenceMeasureCount(state),
  notes: song.selectors.getActiveSequenceNotes(state),
  toolType: selectors.getToolType(state),
}), {
  onDelete: sequenceData.actions.notesDeleted,
  onDeselectAll: sequenceData.actions.notesAllDeselected,
  onDuplicate: sequenceData.actions.notesDuplicated,
  onErase: sequenceData.actions.noteErased,
  onNudge: sequenceData.actions.notesNudged,
  onSelect: sequenceData.actions.noteSelected,
  onSelectAll: sequenceData.actions.notesAllSelected,
})(Notes);
