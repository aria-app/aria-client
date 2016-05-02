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
    dragOffset: selectors.getDragOffset(state),
    dragStartPosition: selectors.getDragStartPosition(state),
    isDragging: selectors.getIsDragging(state),
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
    draw: note => {
      dispatch(actions.draw(note));
    },
    eraseNote: note => {
      dispatch(actions.eraseNote(note));
    },
    playNote: name => {
      dispatch(sound.actions.playNote(name));
    },
    select: note => {
      dispatch(actions.select(note));
    },
    startDragging: options => {
      dispatch(actions.startDragging(options));
    },
    stopDragging: () => {
      dispatch(actions.stopDragging());
    },
  };
}
