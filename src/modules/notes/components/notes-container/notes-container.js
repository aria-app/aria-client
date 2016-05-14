import { connect } from 'react-redux';
import { Notes } from '../notes/notes';
import move from 'modules/move';
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
    isMoving: move.selectors.getIsMoving(state),
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
    draw: (...args) => {
      dispatch(actions.draw(...args));
    },
    erase: (...args) => {
      dispatch(actions.erase(...args));
    },
    fenceSelectStart: (...args) => {
      dispatch(fence.actions.fenceSelectStart(...args));
    },
    fenceSelectUpdate: (...args) => {
      dispatch(fence.actions.fenceSelectUpdate(...args));
    },
    moveStart: () => {
      dispatch(move.actions.moveStart());
    },
    moveUpdate: (...args) => {
      dispatch(move.actions.moveUpdate(...args));
    },
    resizeStart: (...args) => {
      dispatch(resize.actions.resizeStart(...args));
    },
    resizeUpdate: (...args) => {
      dispatch(resize.actions.resizeUpdate(...args));
    },
    selectNote: (...args) => {
      dispatch(actions.selectNote(...args));
    },
    panStart: (...args) => {
      dispatch(sequence.actions.panStart(...args));
    },
    panUpdate: (...args) => {
      dispatch(sequence.actions.panUpdate(...args));
    },
  };
}
