import { connect } from 'react-redux';
import { Notes } from '../notes/notes';
import drag from 'modules/drag';
import fence from 'modules/fence';
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
    isDragging: drag.selectors.getIsDragging(state),
    isPanning: sequence.selectors.getIsPanning(state),
    isSelecting: fence.selectors.getIsSelecting(state),
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
    startDragging: () => {
      dispatch(drag.actions.startDragging());
    },
    stopDragging: () => {
      dispatch(drag.actions.stopDragging());
    },
    startPanning: (startPosition) => {
      dispatch(sequence.actions.startPanning(startPosition));
    },
    startSelecting: (startPosition) => {
      dispatch(fence.actions.startSelecting(startPosition));
    },
    stopSelecting: () => {
      dispatch(fence.actions.stopSelecting());
    },
    stopPanning: () => {
      dispatch(sequence.actions.stopPanning());
    },
    updateFence: (newPosition) => {
      dispatch(fence.actions.updateFence(newPosition));
    },
  };
}
