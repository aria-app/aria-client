import { connect } from 'react-redux';
import { PositionMarker } from '../position-marker/position-marker';
import selectors from '../../selectors';

export const PositionMarkerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PositionMarker);

function mapStateToProps(state) {
  return {
    position: selectors.getPosition(state),
  };
}

function mapDispatchToProps() {
  return {};
}
