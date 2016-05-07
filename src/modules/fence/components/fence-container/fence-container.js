import { connect } from 'react-redux';
import { Fence } from '../fence/fence';
import * as selectors from '../../selectors';

export const FenceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Fence);

function mapStateToProps(state) {
  return {
    isSelecting: selectors.getIsSelecting(state),
    newPosition: selectors.getNewPosition(state),
    startPosition: selectors.getStartPosition(state),
  };
}

function mapDispatchToProps() {
  return {};
}
