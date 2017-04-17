import { connect } from 'react-redux';
import { SequencerToolbar } from './sequencer-toolbar';
import song from '../../../song';
import sequenceData from '../../../sequence-data';

export const SequencerToolbarContainer = connect(state => ({
  areSomeNotesSelected: song.selectors.getAreSomeNotesSelected(state),
  selectedNotes: song.selectors.getSelectedNotes(state),
  toolType: sequenceData.selectors.getToolType(state),
}), {
  onClose: sequenceData.actions.sequenceClosed,
  onDelete: sequenceData.actions.notesDeleted,
  onDuplicate: sequenceData.actions.notesDuplicated,
  onOctaveDown: sequenceData.actions.notesMovedOctaveDown,
  onOctaveUp: sequenceData.actions.notesMovedOctaveUp,
  onToolSelect: sequenceData.actions.toolSelected,
})(SequencerToolbar);
