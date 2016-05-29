import { connect } from 'react-redux';
import song from 'ducks/song';
import { Tracks } from '../tracks/tracks';
import * as actions from '../../actions';
import * as selectors from '../../selectors';

function mapStateToProps(state) {
  return {
    selectedSequenceIds: selectors.getSelectedSequenceIds(state),
    tracks: song.selectors.getTracksWithSequences(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setSelectedSequenceIds: (...args) => dispatch(actions.setSelectedSequenceIds(...args)),
  };
}

export const TracksContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Tracks);
