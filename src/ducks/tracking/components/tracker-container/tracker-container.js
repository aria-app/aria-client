import { connect } from 'react-redux';
import song from 'ducks/song';
import { Tracker } from '../tracker/tracker';
import * as selectors from '../../selectors';

function mapStateToProps(state) {
  return {
    selectedSequenceId: selectors.getSelectedSequenceId(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addTrack: (...args) => dispatch(song.actions.addTrack(...args)),
    setActiveSequenceId: (...args) => dispatch(song.actions.setActiveSequenceId(...args)),
    decrementSequenceLength: (...args) => dispatch(song.actions.decrementSequenceLength(...args)),
    incrementSequenceLength: (...args) => dispatch(song.actions.incrementSequenceLength(...args)),
    decrementSequencePosition: (...args) =>
      dispatch(song.actions.decrementSequencePosition(...args)),
    incrementSequencePosition: (...args) =>
      dispatch(song.actions.incrementSequencePosition(...args)),
  };
}

export const TrackerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Tracker);
