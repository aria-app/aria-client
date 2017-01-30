import { connect } from 'react-redux';
import { Fence } from '../fence/fence';
import * as selectors from '../../selectors';

// wallaby-ignore
export const FenceContainer = connect(state => ({
  endPoint: selectors.getNewPoint(state),
  isSelecting: selectors.getIsSelecting(state),
  startPoint: selectors.getStartPoint(state),
}))(Fence);
