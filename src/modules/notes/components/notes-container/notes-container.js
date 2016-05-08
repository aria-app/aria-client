import { connect } from 'react-redux';
import { Notes } from '../notes/notes';
import drag from 'modules/drag';
import fence from 'modules/fence';
import resize from 'modules/resize';
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
    isResizing: resize.selectors.getIsResizing(state),
    isSelecting: fence.selectors.getIsSelecting(state),
    measureCount: sequence.selectors.getMeasureCount(state),
    notes: selectors.getNotes(state),
    selectedNotes: selectors.getSelectedNotes(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    drag: (...args) => {
      dispatch(drag.actions.drag(...args));
    },
    draw: (...args) => {
      dispatch(actions.draw(...args));
    },
    eraseNote: (...args) => {
      dispatch(actions.eraseNote(...args));
    },
    pan: (...args) => {
      dispatch(sequence.actions.pan(...args));
    },
    playNote: (...args) => {
      dispatch(sound.actions.playNote(...args));
    },
    resize: (...args) => {
      dispatch(resize.actions.resize(...args));
    },
    select: (...args) => {
      dispatch(actions.select(...args));
    },
    startDragging: () => {
      dispatch(drag.actions.startDragging());
    },
    stopDragging: () => {
      dispatch(drag.actions.stopDragging());
    },
    startPanning: (...args) => {
      dispatch(sequence.actions.startPanning(...args));
    },
    startResizing: (...args) => {
      dispatch(resize.actions.startResizing(...args));
    },
    stopResizing: () => {
      dispatch(resize.actions.stopResizing());
    },
    startSelecting: (...args) => {
      dispatch(fence.actions.startSelecting(...args));
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
