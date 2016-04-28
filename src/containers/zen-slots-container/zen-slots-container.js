import { connect } from 'react-redux';
import { ZenSlots } from '../../components/zen-slots/zen-slots';
import { drawNote } from '../../redux/actions';

function mapStateToProps(state) {
  return {
    measureCount: state.measureCount,
    synth: state.synth,
    tool: state.tool,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    requestDrawNote: note => {
      dispatch(drawNote(note));
    },
  };
}

export const ZenSlotsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ZenSlots);
