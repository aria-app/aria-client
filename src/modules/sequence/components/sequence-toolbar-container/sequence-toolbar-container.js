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
    synth: selectors.getSynth(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setSynth: synth => {
      dispatch(actions.setSynth(synth));
    },
    setTool: tool => {
      dispatch(actions.setTool(tool));
    },
  };
}
