import { connect } from 'react-redux';
import { Sequencer } from '../sequencer/sequencer';
import notes from 'ducks/notes';
import song from 'ducks/song';
import transport from 'ducks/transport';
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
    playbackState: transport.selectors.getPlaybackState(state),
    synthType: selectors.getSynthType(state),
    toolType: selectors.getToolType(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeSynthType: (...args) => dispatch(actions.changeSynthType(...args)),
    duplicate: (...args) => dispatch(notes.actions.duplicate(...args)),
    pause: (...args) => dispatch(transport.effects.pause(...args)),
    openSequence: (...args) => dispatch(song.actions.setActiveSequenceId(...args)),
    play: (...args) => dispatch(transport.effects.play(...args)),
    removeSelected: (...args) => dispatch(notes.actions.removeSelected(...args)),
    setScrollTopIfChanged: (...args) => dispatch(actions.setScrollTopIfChanged(...args)),
    setSelectedNoteSizes: (...args) => dispatch(notes.actions.setSelectedNoteSizes(...args)()),
    shiftDownOctave: (...args) => dispatch(notes.actions.shiftDownOctave(...args)),
    shiftUpOctave: (...args) => dispatch(notes.actions.shiftUpOctave(...args)),
    setToolType: (...args) => dispatch(actions.setToolType(...args)),
    stop: (...args) => dispatch(transport.effects.stop(...args)),
  };
}
