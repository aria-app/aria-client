import { connect } from 'react-redux';
import { PositionMarker } from '../position-marker/position-marker';
import sound from 'ducks/sound';

export const PositionMarkerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PositionMarker);

function mapStateToProps(state) {
  return {
    playbackState: sound.selectors.getPlaybackState(state),
    position: sound.selectors.getPosition(state),
  };
}

function mapDispatchToProps() {
  return {};
}
