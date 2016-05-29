import { connect } from 'react-redux';
import song from 'ducks/song';
import { Tracks } from '../tracks/tracks';

function mapStateToProps(state) {
  return {
    tracks: song.selectors.getTracksWithSequences(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    openSequence: (...args) => dispatch(song.actions.setActiveSequenceId(...args)),
  };
}

export const TracksContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Tracks);
