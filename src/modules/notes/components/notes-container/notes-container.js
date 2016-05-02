import { connect } from 'react-redux';
import { Notes } from '../notes/notes';
import drag from 'modules/drag';
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
    dragOffset: drag.selectors.getOffset(state),
    dragStartPosition: drag.selectors.getStartPosition(state),
    isDragging: drag.selectors.getIsDragging(state),
    isPanning: sequence.selectors.getIsPanning(state),
    measureCount: sequence.selectors.getMeasureCount(state),
    panStart: sequence.selectors.getPanStart(state),
    notes: selectors.getNotes(state),
    selectedNotes: selectors.getSelectedNotes(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    drag: newPosition => {
      dispatch(drag.actions.drag(newPosition));
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
    select: notes => {
      dispatch(actions.select(notes));
    },
    startDragging: options => {
      dispatch(drag.actions.startDragging(options));
    },
    stopDragging: () => {
      dispatch(drag.actions.stopDragging());
    },
    startPanning: options => {
      dispatch(sequence.actions.startPanning(options));
    },
    stopPanning: () => {
      dispatch(sequence.actions.stopPanning());
    },
  };
}
