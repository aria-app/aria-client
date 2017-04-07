import { connect } from 'react-redux';
import shared from '../../../shared';
import transport from '../../../transport';

// wallaby-ignore
export const SongTimelineContainer = connect(state => ({
  isVisible: transport.selectors.getIsPlaying(state),
  offset: (transport.selectors.getSongPosition(state) * 2) + 100,
}))(shared.components.Timeline);
