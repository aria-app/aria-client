import { connect } from 'react-redux';
import { Notes } from '../notes/notes';
import * as actions from '../../actions';
import selectors from '../../selectors';

export const NotesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Notes);

function mapStateToProps(state) {
  return {
    dragEvent: selectors.getDragEvent(state),
    notes: selectors.getNotes(state),
    selectedNotes: selectors.getSelectedNotes(state),
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
    selectNotes: notes => {
      dispatch(actions.selectNotes(notes));
    },
    startDragging: options => {
      dispatch(actions.startDragging(options));
    },
    stopDragging: () => {
      dispatch(actions.stopDragging());
    },
  };
}
