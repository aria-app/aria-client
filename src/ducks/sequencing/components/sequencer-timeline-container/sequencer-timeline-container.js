import { connect } from 'react-redux';
import shared from 'ducks/shared';
import transport from 'ducks/transport';

export const SequencerTimelineContainer = connect((state) => ({
  offset: transport.selectors.getPosition(state) * 40,
}))(shared.components.Timeline);
