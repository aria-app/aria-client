import { connect } from 'react-redux';
import song from '../../../song';
import sequenceData from '../../../sequence-data';
import * as selectors from '../../selectors';
import { SequencerToolbar } from './sequencer-toolbar';

export const SequencerToolbarContainer = connect(state => ({
  areSomeNotesSelected: song.selectors.getAreSomeNotesSelected(state),
  measureCount: song.selectors.getActiveSequenceMeasureCount(state),
  selectedNotes: song.selectors.getSelectedNotes(state),
  toolType: selectors.getToolType(state),
}), {
  onClose: sequenceData.actions.sequenceClosed,
  onDelete: sequenceData.actions.notesDeleted,
  onDuplicate: sequenceData.actions.notesDuplicated,
  onOctaveDown: sequenceData.actions.notesMovedOctaveDown,
  onOctaveUp: sequenceData.actions.notesMovedOctaveUp,
  onToolSelect: sequenceData.actions.toolSelected,
})(SequencerToolbar);
