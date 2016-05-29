import { connect } from 'react-redux';
import { Slots } from '../slots/slots';
import song from 'ducks/song';

export const SlotsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Slots);

function mapStateToProps(state) {
  return {
    measureCount: song.selectors.getMeasureCount(state),
  };
}

function mapDispatchToProps() {
  return {};
}
