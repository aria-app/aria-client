import { connect } from 'react-redux';
import { Notes } from '../notes/notes';
import song from '../../../song';
import sequenceData from '../../../sequence-data';

export const NotesContainer = connect(state => ({
  measureCount: song.selectors.getActiveSequenceMeasureCount(state),
  notes: song.selectors.getActiveSequenceNotes(state),
  toolType: sequenceData.selectors.getToolType(state),
}), {
  onErase: sequenceData.actions.noteErased,
  onSelect: sequenceData.actions.noteSelected,
})(Notes);
