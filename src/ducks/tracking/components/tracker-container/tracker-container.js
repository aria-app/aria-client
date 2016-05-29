import { connect } from 'react-redux';
import song from 'ducks/song';
import { Tracker } from '../tracker/tracker';

function mapStateToProps(state) {
  return {
    tracksWithSequences: song.selectors.getTracksWithSequences(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export const TrackerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Tracker);
