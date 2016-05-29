import { connect } from 'react-redux';
import { Notes } from '../notes/notes';
import moving from 'ducks/moving';
import notes from 'ducks/notes';
import panning from 'ducks/panning';
import resizing from 'ducks/resizing';
import selection from 'ducks/selection';
import song from 'ducks/song';
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
    measureCount: selectors.getMeasureCount(state),
    mousePoint: selectors.getMousePoint(state),
    notes: song.selectors.getActiveNotes(state),
    selectedNotes: notes.selectors.getSelectedNotes(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    draw: (...args) => dispatch(notes.actions.draw(...args)),
    erase: (...args) => dispatch(notes.actions.erase(...args)),
    selectNote: (...args) => dispatch(notes.actions.selectNote(...args)),
    startMoving: () => dispatch(moving.actions.start()),
    startResizing: (...args) => dispatch(resizing.actions.start(...args)),
    startSelection: (...args) => dispatch(selection.actions.start(...args)),
    updateMoving: (...args) => dispatch(moving.actions.update(...args)),
    updateResizing: (...args) => dispatch(resizing.actions.update(...args)),
    updateSelection: (...args) => dispatch(selection.actions.update(...args)),
  };
}
