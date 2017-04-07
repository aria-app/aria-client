import { connect } from 'react-redux';
import { Sequencer } from '../sequencer/sequencer';
import song from '../../../song';
import * as actions from '../../actions';
import * as selectors from '../../selectors';

// wallaby-ignore
export const SequencerContainer = connect(state => ({
  activeSequenceId: song.selectors.getActiveSequenceId(state),
  areSomeNotesSelected: song.selectors.getAreSomeNotesSelected(state),
  toolType: selectors.getToolType(state),
}), {
  onSelectedNotesDelete: song.actions.selectedNotesDeleted,
  onSelectedNotesDuplicate: song.actions.notesDuplicated,
  onSelectedNotesOctaveDown: song.actions.selectedNotesMovedOctaveDown,
  onSelectedNotesOctaveUp: song.actions.selectedNotesMovedOctaveUp,
  onSelectedNotesResize: song.actions.selectedNotesResized,
  onSequenceClose: song.actions.sequenceClosed,
  onToolSelect: actions.toolSelected,
})(Sequencer);
