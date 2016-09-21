import { connect } from 'react-redux';
import { Slots } from '../slots/slots';
import song from '../../../song';

export const SlotsContainer = connect(state => ({
  measureCount: song.selectors.getActiveSequenceMeasureCount(state),
}))(Slots);
