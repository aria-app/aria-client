import { connect } from 'react-redux';
import { Sequencer } from '../sequencer/sequencer';
import notes from '../../../notes';
import sequencingPosition from '../../../sequencing-position';
import song from '../../../song';
import * as actions from '../../actions';
import * as selectors from '../../selectors';

export const SequencerContainer = connect(state => ({
  activeSequenceId: song.selectors.getActiveSequenceId(state),
  areSomeNotesSelected: notes.selectors.getAreSomeNotesSelected(state),
  toolType: selectors.getToolType(state),
}), {
  onSelectedNotesDelete: notes.actions.selectedNotesDeleted,
  onSelectedNotesDuplicate: notes.actions.notesDuplicated,
  onSelectedNotesOctaveDown: notes.actions.selectedNotesMovedOctaveDown,
  onSelectedNotesOctaveUp: notes.actions.selectedNotesMovedOctaveUp,
  onSelectedNotesResize: notes.actions.selectedNotesResized,
  onSequenceClose: song.actions.sequenceClosed,
  onToolSelect: actions.toolSelected,
  onVerticalScroll: sequencingPosition.actions.scrolledVertically,
})(Sequencer);
