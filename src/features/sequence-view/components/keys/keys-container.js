import { connect } from 'react-redux';
import { Keys } from '../keys/keys';
import * as actions from '../../actions';

export const KeysContainer = connect(() => ({}), {
  onKeyPress: actions.keyPressed,
})(Keys);
