import { connect } from 'react-redux';
import { Keys } from '../keys/keys';
import playing from 'ducks/playing';

export const KeysContainer = connect(() => ({}), {
  previewNote: playing.actions.previewNote,
})(Keys);
