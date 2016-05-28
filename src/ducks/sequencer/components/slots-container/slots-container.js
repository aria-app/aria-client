import { connect } from 'react-redux';
import { Slots } from '../slots/slots';
import * as selectors from '../../selectors';

export const SlotsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Slots);

function mapStateToProps(state) {
  return {
    measureCount: selectors.getMeasureCount(state),
  };
}

function mapDispatchToProps() {
  return {};
}
