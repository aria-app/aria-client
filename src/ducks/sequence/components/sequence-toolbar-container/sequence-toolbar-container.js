import { connect } from 'react-redux';
import { Toolbar } from '../toolbar/toolbar';
import * as actions from '../../actions';
import * as selectors from '../../selectors';

export const ToolbarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Toolbar);

function mapStateToProps(state) {
  return {
    synthType: selectors.getSynthType(state),
    toolType: selectors.getToolType(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeSynthType: synthType => {
      dispatch(actions.changeSynthType(synthType));
    },
    setToolType: toolType => {
      dispatch(actions.setToolType(toolType));
    },
  };
}
