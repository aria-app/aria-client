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
    offset: transport.selectors.getPosition(state) * 40,
  };
}

function mapDispatchToProps() {
  return {};
}
