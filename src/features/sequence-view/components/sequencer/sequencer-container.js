import { connect } from 'react-redux';
import { Sequencer } from '../sequencer/sequencer';
import song from '../../../song';
import sequenceData from '../../../sequence-data';

export const SequencerContainer = connect(state => ({
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
})(Sequencer);
