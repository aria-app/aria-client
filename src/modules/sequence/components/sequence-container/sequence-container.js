import { connect } from 'react-redux';
import { Sequence } from '../sequence/sequence';
import * as actions from '../../actions';

export const SequenceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Sequence);

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    setScrollTop: (...args) => dispatch(actions.setScrollTop(...args)),
  };
}
