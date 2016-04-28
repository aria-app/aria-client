import { connect } from 'react-redux';
import { ZenPositionMarker } from '../../components/zen-position-marker/zen-position-marker';

function mapStateToProps(state) {
  return {
    position: state.position,
  };
}

function mapDispatchToProps() {
  return {};
}

export const ZenPositionMarkerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ZenPositionMarker);
