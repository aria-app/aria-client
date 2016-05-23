import { connect } from 'react-redux';
import { Sequence } from '../sequence/sequence';
import notes from 'ducks/notes';
import sound from 'ducks/sound';
import * as actions from '../../actions';
import * as selectors from '../../selectors';

export const SequenceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Sequence);

function mapStateToProps(state) {
  return {
    isSelectionActive: notes.selectors.getIsSelectionActive(state),
    playbackState: sound.selectors.getPlaybackState(state),
    synthType: selectors.getSynthType(state),
    toolType: selectors.getToolType(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeSynthType: (...args) => dispatch(actions.changeSynthType(...args)),
    duplicate: (...args) => dispatch(notes.actions.duplicate(...args)),
    pause: (...args) => dispatch(sound.actions.pause(...args)),
    play: (...args) => dispatch(sound.actions.play(...args)),
    removeSelected: (...args) => dispatch(notes.actions.removeSelected(...args)),
    setScrollTopIfChanged: (...args) => dispatch(actions.setScrollTopIfChanged(...args)),
    setSelectedNoteSizes: (...args) => dispatch(notes.actions.setSelectedNoteSizes(...args)()),
    shiftDownOctave: (...args) => dispatch(notes.actions.shiftDownOctave(...args)),
    shiftUpOctave: (...args) => dispatch(notes.actions.shiftUpOctave(...args)),
    setToolType: (...args) => dispatch(actions.setToolType(...args)),
    stop: (...args) => dispatch(sound.actions.stop(...args)),
  };
}
