import { connect } from 'react-redux';
import shared from '../../../shared';

// TODO: Add appropriate state connections back when available
export const SequencerTimelineContainer = connect(() => ({
  isVisible: false,
  offset: 0 * 40,
}))(shared.components.Timeline);
