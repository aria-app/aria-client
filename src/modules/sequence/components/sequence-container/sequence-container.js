import { connect } from 'react-redux';
import { Sequence } from '../sequence/sequence';
import notes from 'modules/notes';
import sound from 'modules/sound';
import selectors from '../../selectors';

export const SequenceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Sequence);

function mapStateToProps(state) {
  return {
    selectedNotes: notes.selectors.getSelectedNotes(state),
    scale: selectors.getScale(state),
    toolType: selectors.getToolType(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    playNote: (...options) => {
      dispatch(sound.actions.playNote(...options));
    },
  };
}
