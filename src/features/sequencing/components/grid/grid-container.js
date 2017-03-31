import { connect } from 'react-redux';
import { Grid } from '../grid/grid';
import panning from '../../../panning';
import song from '../../../song';
import * as selectors from '../../selectors';

// wallaby-ignore
export const GridContainer = connect(state => ({
  isPanning: panning.selectors.getIsPanning(state),
  measureCount: song.selectors.getActiveSequenceMeasureCount(state),
  toolType: selectors.getToolType(state),
}), {
  onPanningStart: panning.actions.started,
  onPanningStop: panning.actions.stopped,
  onPanningUpdate: panning.actions.updated,
})(Grid);
