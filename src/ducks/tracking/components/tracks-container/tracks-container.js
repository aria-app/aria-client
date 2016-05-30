import { connect } from 'react-redux';
import song from 'ducks/song';
import { Tracks } from '../tracks/tracks';
import * as actions from '../../actions';
import * as selectors from '../../selectors';

function mapStateToProps(state) {
  return {
    selectedSequenceId: selectors.getSelectedSequenceId(state),
    tracks: song.selectors.getTracksWithSequences(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setSelectedSequenceId: (...args) => dispatch(actions.setSelectedSequenceId(...args)),
  };
}

export const TracksContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Tracks);
