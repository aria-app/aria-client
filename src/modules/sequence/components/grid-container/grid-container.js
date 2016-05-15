import { connect } from 'react-redux';
import { Grid } from '../grid/grid';
import sound from 'modules/sound';
import selectors from '../../selectors';

export const GridContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Grid);

function mapStateToProps(state) {
  return {
    scale: selectors.getScale(state),
    toolType: selectors.getToolType(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    playNote: (...args) => dispatch(sound.actions.playNote(...args)),
  };
}
