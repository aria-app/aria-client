import { connect } from 'react-redux';
import shared from 'ducks/shared';
import transport from 'ducks/transport';

export const SongTimelineContainer = connect(state => ({
  isVisible: transport.selectors.getIsPlaying(state),
  offset: transport.selectors.getSongPosition(state) * 2 + 100,
}))(shared.components.Timeline);
