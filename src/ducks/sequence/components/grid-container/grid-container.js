import { connect } from 'react-redux';
import { Grid } from '../grid/grid';
import panning from 'ducks/panning';
import sound from 'ducks/sound';
import * as actions from '../../actions';
import * as selectors from '../../selectors';

export const GridContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Grid);

function mapStateToProps(state) {
  return {
    isPanning: panning.selectors.getIsPanning(state),
    scale: selectors.getScale(state),
    toolType: selectors.getToolType(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    playNote: (...args) => dispatch(sound.actions.playNote(...args)),
    setScrollLeftIfChanged: (...args) => dispatch(actions.setScrollLeftIfChanged(...args)),
    startPanning: (...args) => dispatch(panning.actions.start(...args)),
    updateMousePoint: (...args) => dispatch(actions.updateMousePoint(...args)),
    updatePanning: (...args) => dispatch(panning.actions.update(...args)),
  };
}
