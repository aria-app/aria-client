import { connect } from 'react-redux';
import { Grid } from '../grid/grid';
import song from '../../../song';
import * as selectors from '../../selectors';

// wallaby-ignore
export const GridContainer = connect(state => ({
  measureCount: song.selectors.getActiveSequenceMeasureCount(state),
  toolType: selectors.getToolType(state),
}))(Grid);
