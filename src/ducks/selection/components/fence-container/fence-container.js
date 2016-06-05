import { connect } from 'react-redux';
import { Fence } from '../fence/fence';
import * as selectors from '../../selectors';

export const FenceContainer = connect((state) => ({
  isSelecting: selectors.getIsSelecting(state),
  newPoint: selectors.getNewPoint(state),
  startPoint: selectors.getStartPoint(state),
}))(Fence);
