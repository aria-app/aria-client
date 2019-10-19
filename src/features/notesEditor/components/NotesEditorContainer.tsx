import { connect } from 'react-redux';
import shared from '../../shared';
import song from '../../song';
import NotesEditor from './NotesEditor';

export default connect(
  (state, ownProps) => ({
    isLoading: song.selectors.getIsSongLoading(state),
    isRedoEnabled: song.selectors.getIsRedoEnabled(state),
    isUndoEnabled: song.selectors.getIsUndoEnabled(state),
    notes: song.selectors.getNotesBySequenceId(state)(ownProps.sequenceId),
    sequence: song.selectors.getSequenceById(state)(ownProps.sequenceId),
  }),
  {
    onDelete: song.actions.notesDeleted,
    onDraw: song.actions.noteDrawn,
    onDrag: song.actions.notesDragged,
    onDuplicate: song.actions.notesDuplicated,
    onErase: song.actions.noteErased,
    onLoad: shared.actions.routeNotesEditorLoaded,
    onNudge: song.actions.notesNudged,
    onOctaveDown: song.actions.notesMovedOctaveDown,
    onOctaveUp: song.actions.notesMovedOctaveUp,
    onRedo: song.actions.redoRequested,
    onResize: song.actions.notesResized,
    onUndo: song.actions.undoRequested,
  },
  (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    onDraw: point => dispatchProps.onDraw(point, stateProps.sequence),
    onNudge: (delta, selectedNotes) =>
      dispatchProps.onNudge(delta, selectedNotes, stateProps.sequence),
  }),
)(NotesEditor);
