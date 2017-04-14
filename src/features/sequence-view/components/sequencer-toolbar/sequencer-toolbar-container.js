import { connect } from 'react-redux';
import { SequencerToolbar } from './sequencer-toolbar';
import song from '../../../song';
import sequenceData from '../../../sequence-data';

export const SequencerToolbarContainer = connect(state => ({
  activeSequenceId: song.selectors.getActiveSequenceId(state),
  areSomeNotesSelected: song.selectors.getAreSomeNotesSelected(state),
  toolType: sequenceData.selectors.getToolType(state),
}), {
  onSelectedNotesDelete: sequenceData.actions.selectedNotesDeleted,
  onSelectedNotesDuplicate: sequenceData.actions.notesDuplicated,
  onSelectedNotesOctaveDown: sequenceData.actions.selectedNotesMovedOctaveDown,
  onSelectedNotesOctaveUp: sequenceData.actions.selectedNotesMovedOctaveUp,
  onSelectedNotesResize: sequenceData.actions.selectedNotesResized,
  onSequenceClose: sequenceData.actions.sequenceClosed,
  onToolSelect: sequenceData.actions.toolSelected,
})(SequencerToolbar);
