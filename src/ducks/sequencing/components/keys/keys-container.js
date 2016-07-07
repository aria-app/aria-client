import { connect } from 'react-redux';
import { Keys } from '../keys/keys';
import playing from '../../../playing';

export const KeysContainer = connect(() => ({}), {
  previewNote: playing.actions.notePreviewed,
})(Keys);
