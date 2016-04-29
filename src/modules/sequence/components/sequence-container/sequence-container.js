import { connect } from 'react-redux';
import { Sequence } from '../sequence/sequence';
import * as actions from '../../actions';
import selectors from '../../selectors';

export const SequenceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Sequence);

function mapStateToProps(state) {
  return {
    selectedNotes: selectors.getSelectedNotes(state),
    scale: selectors.getScale(state),
    tool: selectors.getTool(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    playNote: (...options) => {
      dispatch(actions.playNote(...options));
    },
    requestNotes: notes => {
      dispatch(actions.deleteNotes(notes));
    },
  };
}
