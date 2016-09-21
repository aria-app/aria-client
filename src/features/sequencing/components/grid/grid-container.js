import { connect } from 'react-redux';
import { Grid } from '../grid/grid';
import panning from '../../../panning';
import song from '../../../song';
import * as actions from '../../actions';
import * as selectors from '../../selectors';

export const GridContainer = connect(state => ({
  isPanning: panning.selectors.getIsPanning(state),
  measureCount: song.selectors.getActiveSequenceMeasureCount(state),
  toolType: selectors.getToolType(state),
}), {
  mouseMoved: actions.mouseMoved,
  scrolledHorizontally: actions.scrolledHorizontally,
  startPanning: panning.actions.started,
  updatePanning: panning.actions.updated,
})(Grid);
