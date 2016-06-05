import { connect } from 'react-redux';
import { Keys } from '../keys/keys';
import playing from 'ducks/playing';
import * as selectors from '../../selectors';

export const KeysContainer = connect((state) => ({
  scale: selectors.getScale(state),
}), {
  playNote: playing.effects.playNote,
})(Keys);
