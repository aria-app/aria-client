import { connect } from 'react-redux';
import { Sequencer } from '../sequencer/sequencer';
import notes from 'ducks/notes';
import song from 'ducks/song';
import * as actions from '../../actions';
import * as selectors from '../../selectors';

export const SequencerContainer = connect((state) => ({
  activeSequenceId: song.selectors.getActiveSequenceId(state),
  isSelectingActive: notes.selectors.getIsSelectingActive(state),
  toolType: selectors.getToolType(state),
}), {
  closeSequence: song.actions.sequenceClosed,
  duplicate: notes.actions.notesDuplicated,
  removeSelected: notes.actions.selectedNotesRemoved,
  resizeSelected: notes.actions.selectedNotesResized,
  scrolledVertically: actions.scrolledVertically,
  selectTool: actions.toolSelected,
  shiftDownOctave: notes.actions.selectedNotesMovedOctaveDown,
  shiftUpOctave: notes.actions.selectedNotesMovedOctaveUp,
})(Sequencer);
