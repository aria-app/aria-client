import { connect } from 'react-redux';
import { Keys } from '../keys/keys';
import transport from 'ducks/transport';
import * as selectors from '../../selectors';

export const KeysContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Keys);

function mapStateToProps(state) {
  return {
    scale: selectors.getScale(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    playNote: (...args) => dispatch(transport.actions.playNote(...args)),
  };
}
