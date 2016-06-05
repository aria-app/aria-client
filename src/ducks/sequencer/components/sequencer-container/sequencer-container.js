import { connect } from 'react-redux';
import { Sequencer } from '../sequencer/sequencer';
import notes from 'ducks/notes';
import song from 'ducks/song';
import * as actions from '../../actions';
import * as selectors from '../../selectors';

export const SequencerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Sequencer);

function mapStateToProps(state) {
  return {
    activeSequenceId: song.selectors.getActiveSequenceId(state),
    isSelectionActive: notes.selectors.getIsSelectionActive(state),
    synthType: selectors.getSynthType(state),
    toolType: selectors.getToolType(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeSynthType: (...args) => dispatch(actions.changeSynthType(...args)),
    duplicate: (...args) => dispatch(notes.actions.duplicate(...args)),
    closeSequence: (...args) => dispatch(song.actions.closeSequence(...args)),
    removeSelected: (...args) => dispatch(notes.actions.removeSelected(...args)),
    setScrollTopIfChanged: (...args) => dispatch(actions.setScrollTopIfChanged(...args)),
    resizeSelected: (...args) => dispatch(notes.actions.resizeSelected(...args)()),
    shiftDownOctave: (...args) => dispatch(notes.actions.shiftDownOctave(...args)),
    shiftUpOctave: (...args) => dispatch(notes.actions.shiftUpOctave(...args)),
    setToolType: (...args) => dispatch(actions.setToolType(...args)),
  };
}
