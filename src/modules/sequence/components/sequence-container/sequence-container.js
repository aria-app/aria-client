import { connect } from 'react-redux';
import { Sequence } from '../sequence/sequence';
import sound from 'modules/sound';
import * as actions from '../../actions';
import selectors from '../../selectors';

export const SequenceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Sequence);

function mapStateToProps(state) {
  return {
    selectedNotes: selectors.getSelectedNotes(state),
    scale: selectors.getScale(state),
    toolType: selectors.getToolType(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    playNote: (...options) => {
      dispatch(sound.actions.playNote(...options));
    },
    requestNotes: notes => {
      dispatch(actions.deleteNotes(notes));
    },
  };
}
