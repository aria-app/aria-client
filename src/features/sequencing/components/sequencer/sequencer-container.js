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
  onDuplicate: notes.actions.notesDuplicated,
  onResizeSelected: notes.actions.selectedNotesResized,
  onSelectedNotesDelete: notes.actions.selectedNotesDeleted,
  onSequenceClose: song.actions.sequenceClosed,
  onShiftOctaveDown: notes.actions.selectedNotesMovedOctaveDown,
  onShiftOctaveUp: notes.actions.selectedNotesMovedOctaveUp,
  onToolSelect: actions.toolSelected,
  onVerticalScroll: sequencingPosition.actions.scrolledVertically,
})(Sequencer);
