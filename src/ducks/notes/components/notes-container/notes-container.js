import { connect } from 'react-redux';
import { Notes } from '../notes/notes';
import moving from 'ducks/moving';
import panning from 'ducks/panning';
import resizing from 'ducks/resizing';
import selection from 'ducks/selection';
import sequence from 'ducks/sequence';
import * as actions from '../../actions';
import * as selectors from '../../selectors';

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
    mousePoint: sequence.selectors.getMousePoint(state),
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
    startResizing: (...args) => dispatch(resizing.actions.start(...args)),
    startSelection: (...args) => dispatch(selection.actions.start(...args)),
    updateMoving: (...args) => dispatch(moving.actions.update(...args)),
    updateResizing: (...args) => dispatch(resizing.actions.update(...args)),
    updateSelection: (...args) => dispatch(selection.actions.update(...args)),
  };
}
