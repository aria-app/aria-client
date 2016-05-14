import { connect } from 'react-redux';
import { Notes } from '../notes/notes';
import drag from 'modules/drag';
import fence from 'modules/fence';
import resize from 'modules/resize';
import sequence from 'modules/sequence';
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
    resize: (...args) => {
      dispatch(resize.actions.resize(...args));
    },
    selectInFence: (...args) => {
      dispatch(fence.actions.selectInFence(...args));
    },
    selectNote: (...args) => {
      dispatch(actions.selectNote(...args));
    },
    startDragging: () => {
      dispatch(drag.actions.startDragging());
    },
    startPanning: (...args) => {
      dispatch(sequence.actions.startPanning(...args));
    },
    startResizing: (...args) => {
      dispatch(resize.actions.startResizing(...args));
    },
    startSelecting: (...args) => {
      dispatch(fence.actions.startSelecting(...args));
    },
  };
}
