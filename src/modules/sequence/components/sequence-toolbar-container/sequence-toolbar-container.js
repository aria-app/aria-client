import { connect } from 'react-redux';
import { SequenceToolbar } from '../sequence-toolbar/sequence-toolbar';
import * as actions from '../../actions';
import selectors from '../../selectors';

export const SequenceToolbarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SequenceToolbar);

function mapStateToProps(state) {
  return {
    synthType: selectors.getSynthType(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeSynthType: synthType => {
      dispatch(actions.changeSynthType(synthType));
    },
    setTool: tool => {
      dispatch(actions.setTool(tool));
    },
  };
}
