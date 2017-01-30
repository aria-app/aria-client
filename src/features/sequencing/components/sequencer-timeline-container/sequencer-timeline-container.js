import { connect } from 'react-redux';
import shared from '../../../shared';
import transport from '../../../transport';

// wallaby-ignore
export const SequencerTimelineContainer = connect(state => ({
  isVisible: transport.selectors.getIsPlaying(state),
  offset: transport.selectors.getPosition(state) * 40,
}))(shared.components.Timeline);
