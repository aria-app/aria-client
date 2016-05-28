import { connect } from 'react-redux';
import { PositionMarker } from '../position-marker/position-marker';
import transport from 'ducks/transport';

export const PositionMarkerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PositionMarker);

function mapStateToProps(state) {
  return {
    playbackState: transport.selectors.getPlaybackState(state),
    position: transport.selectors.getPosition(state),
  };
}

function mapDispatchToProps() {
  return {};
}
