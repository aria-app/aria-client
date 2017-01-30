import { connect } from 'react-redux';
import { Grid } from '../grid/grid';
import panning from '../../../panning';
import sequencingPosition from '../../../sequencing-position';
import song from '../../../song';
import * as selectors from '../../selectors';

// wallaby-ignore
export const GridContainer = connect(state => ({
  isPanning: panning.selectors.getIsPanning(state),
  measureCount: song.selectors.getActiveSequenceMeasureCount(state),
  toolType: selectors.getToolType(state),
}), {
  onHorizontalScroll: sequencingPosition.actions.scrolledHorizontally,
  onMouseMove: sequencingPosition.actions.mouseMoved,
  onPanningStart: panning.actions.started,
  onPanningUpdate: panning.actions.updated,
})(Grid);
