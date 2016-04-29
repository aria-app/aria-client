import { connect } from 'react-redux';
import { Slots } from '../slots/slots';
import * as actions from '../../actions';
import selectors from '../../selectors';

export const SlotsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Slots);

function mapStateToProps(state) {
  return {
    measureCount: selectors.getMeasureCount(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    playNote: (...options) => {
      dispatch(actions.playNote(...options));
    },
    drawNote: note => {
      dispatch(actions.drawNote(note));
    },
  };
}
