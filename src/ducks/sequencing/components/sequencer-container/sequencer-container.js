import { connect } from 'react-redux';
import { Sequencer } from '../sequencer/sequencer';
import notes from 'ducks/notes';
import song from 'ducks/song';
import * as actions from '../../actions';
import * as selectors from '../../selectors';

export const SequencerContainer = connect((state) => ({
  activeSequenceId: song.selectors.getActiveSequenceId(state),
  isSelectingActive: notes.selectors.getIsSelectingActive(state),
  synthType: selectors.getSynthType(state),
  toolType: selectors.getToolType(state),
}), {
  closeSequence: song.actions.closeSequence,
  duplicate: notes.actions.duplicate,
  removeSelected: notes.actions.removeSelected,
  resizeSelected: notes.actions.resizeSelected,
  setScrollTopIfChanged: actions.setScrollTopIfChanged,
  setToolType: actions.setToolType,
  shiftDownOctave: notes.actions.shiftDownOctave,
  shiftUpOctave: notes.actions.shiftUpOctave,
})(Sequencer);
