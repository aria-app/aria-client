import { connect } from 'react-redux';
import { Notes } from '../notes/notes';
import moving from 'modules/moving';
import panning from 'modules/panning';
import resizing from 'modules/resizing';
import selection from 'modules/selection';
import sequence from 'modules/sequence';
import * as actions from '../../actions';
import selectors from '../../selectors';

export const NotesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Notes);

function mapStateToProps(state) {
  return {
    isMoving: moving.selectors.getIsMoving(state),
    isPanning: panning.selectors.getIsPanning(state),
    isResizing: resizing.selectors.getIsResizing(state),
    isSelecting: selection.selectors.getIsSelecting(state),
    measureCount: sequence.selectors.getMeasureCount(state),
    notes: selectors.getNotes(state),
    selectedNotes: selectors.getSelectedNotes(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    draw: (...args) => dispatch(actions.draw(...args)),
    erase: (...args) => dispatch(actions.erase(...args)),
    selectNote: (...args) => dispatch(actions.selectNote(...args)),
    startMoving: () => dispatch(moving.actions.start()),
    startPanning: (...args) => dispatch(panning.actions.start(...args)),
    startResizing: (...args) => dispatch(resizing.actions.start(...args)),
    startSelection: (...args) => dispatch(selection.actions.start(...args)),
    updateMoving: (...args) => dispatch(moving.actions.update(...args)),
    updateResizing: (...args) => dispatch(resizing.actions.update(...args)),
    updatePanning: (...args) => dispatch(panning.actions.update(...args)),
    updateSelection: (...args) => dispatch(selection.actions.update(...args)),
  };
}
