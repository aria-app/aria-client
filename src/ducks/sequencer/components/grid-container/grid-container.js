import { connect } from 'react-redux';
import { Grid } from '../grid/grid';
import panning from 'ducks/panning';
import playing from 'ducks/playing';
import song from 'ducks/song';
import * as actions from '../../actions';
import * as selectors from '../../selectors';

export const GridContainer = connect((state) => ({
  isPanning: panning.selectors.getIsPanning(state),
  measureCount: song.selectors.getActiveSequenceMeasureCount(state),
  scale: selectors.getScale(state),
  toolType: selectors.getToolType(state),
}), {
  playNote: playing.effects.playNote,
  setScrollLeftIfChanged: actions.setScrollLeftIfChanged,
  startPanning: panning.actions.start,
  updateMousePoint: actions.updateMousePoint,
  updatePanning: panning.actions.update,
})(Grid);
