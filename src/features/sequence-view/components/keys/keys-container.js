import { connect } from 'react-redux';
import { Keys } from '../keys/keys';
import sequenceData from '../../../sequence-data';

export const KeysContainer = connect(() => ({}), {
  onKeyPress: sequenceData.actions.keyPressed,
})(Keys);
