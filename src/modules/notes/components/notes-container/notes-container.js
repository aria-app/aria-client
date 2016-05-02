import { connect } from 'react-redux';
import { Notes } from '../notes/notes';
import sequence from 'modules/sequence';
import sound from 'modules/sound';
import * as actions from '../../actions';
import selectors from '../../selectors';

export const NotesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Notes);

function mapStateToProps(state) {
  return {
    dragEvent: selectors.getDragEvent(state),
    measureCount: sequence.selectors.getMeasureCount(state),
    notes: selectors.getNotes(state),
    selectedNote: selectors.getSelectedNote(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    drag: newPosition => {
      dispatch(actions.drag(newPosition));
    },
    drawNote: note => {
      dispatch(actions.drawNote(note));
    },
    eraseNote: note => {
      dispatch(actions.eraseNote(note));
    },
    playNote: name => {
      dispatch(sound.actions.playNote(name));
    },
    selectNote: note => {
      dispatch(actions.selectNote(note));
    },
    startDragging: options => {
      dispatch(actions.startDragging(options));
    },
    stopDragging: () => {
      dispatch(actions.stopDragging());
    },
  };
}
