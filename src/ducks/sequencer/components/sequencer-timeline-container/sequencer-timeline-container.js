import { connect } from 'react-redux';
import shared from 'ducks/shared';
import transport from 'ducks/transport';

const { Timeline } = shared.components;
const { PLAYING } = transport.constants.playbackStates;

export const SequencerTimelineContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Timeline);

function mapStateToProps(state) {
  const isVisible = transport.selectors.getPlaybackState(state) === PLAYING;
  return {
    offset: transport.selectors.getPosition(state) * 40,
    isVisible,
  };
}

function mapDispatchToProps() {
  return {};
}
