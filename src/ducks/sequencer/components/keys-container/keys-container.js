import { connect } from 'react-redux';
import { Keys } from '../keys/keys';
import playing from 'ducks/playing';
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
    playNote: (...args) => dispatch(playing.effects.playNote(...args)),
  };
}
