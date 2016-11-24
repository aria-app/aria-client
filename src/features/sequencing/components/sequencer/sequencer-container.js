import { connect } from 'react-redux';
import { Sequencer } from '../sequencer/sequencer';
import notes from '../../../notes';
import sequencingPosition from '../../../sequencing-position';
import song from '../../../song';
import * as actions from '../../actions';
import * as selectors from '../../selectors';

export const SequencerContainer = connect(state => ({
  activeSequenceId: song.selectors.getActiveSequenceId(state),
  isSelectingActive: notes.selectors.getIsSelectingActive(state),
  toolType: selectors.getToolType(state),
}), {
  closeSequence: song.actions.sequenceClosed,
  duplicate: notes.actions.notesDuplicated,
  deleteSelectedNotes: notes.actions.selectedNotesDeleted,
  resizeSelected: notes.actions.selectedNotesResized,
  scrolledVertically: sequencingPosition.actions.scrolledVertically,
  selectTool: actions.toolSelected,
  shiftDownOctave: notes.actions.selectedNotesMovedOctaveDown,
  shiftUpOctave: notes.actions.selectedNotesMovedOctaveUp,
})(Sequencer);
