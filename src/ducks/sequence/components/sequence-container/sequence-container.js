import { connect } from 'react-redux';
import { Sequence } from '../sequence/sequence';
import notes from 'ducks/notes';
import * as actions from '../../actions';
import * as selectors from '../../selectors';

export const SequenceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Sequence);

function mapStateToProps(state) {
  return {
    isSelectionActive: notes.selectors.getIsSelectionActive(state),
    synthType: selectors.getSynthType(state),
    toolType: selectors.getToolType(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeSynthType: (...args) => dispatch(actions.changeSynthType(...args)),
    duplicate: (...args) => dispatch(notes.actions.duplicate(...args)),
    setScrollTopIfChanged: (...args) => dispatch(actions.setScrollTopIfChanged(...args)),
    setToolType: (...args) => dispatch(actions.setToolType(...args)),
  };
}
