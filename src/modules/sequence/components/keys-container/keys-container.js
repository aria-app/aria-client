import { connect } from 'react-redux';
import { Keys } from '../keys/keys';
import sound from 'modules/sound';
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
    playNote: (...args) => dispatch(sound.actions.playNote(...args)),
  };
}
