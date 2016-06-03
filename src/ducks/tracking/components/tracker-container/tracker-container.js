import { connect } from 'react-redux';
import song from 'ducks/song';
import { Tracker } from '../tracker/tracker';
import * as actions from '../../actions';
import * as selectors from '../../selectors';

function mapStateToProps(state) {
  return {
    selectedSequenceId: selectors.getSelectedSequenceId(state),
    stagedTrack: selectors.getStagedTrack(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addTrack: (...args) => dispatch(song.actions.addTrack(...args)),
    setActiveSequenceId: (...args) => dispatch(song.actions.setActiveSequenceId(...args)),
    setStagedTrack: (...args) => dispatch(actions.setStagedTrack(...args)),
    updateTrack: (...args) => dispatch(song.actions.updateTrack(...args)),
    updateStagedTrackSynthType: (...args) => dispatch(actions.updateStagedTrackSynthType(...args)),
    decrementSequenceLength: (...args) => dispatch(song.actions.decrementSequenceLength(...args)),
    decrementSequencePosition: (...args) => dispatch(song.actions.decrementSequencePosition(...args)),
    incrementSequenceLength: (...args) => dispatch(song.actions.incrementSequenceLength(...args)),
    incrementSequencePosition: (...args) => dispatch(song.actions.incrementSequencePosition(...args)),
  };
}

export const TrackerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Tracker);
