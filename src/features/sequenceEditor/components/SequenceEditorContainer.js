import { connect } from "react-redux";
import shared from "../../shared";
import song from "../../song";
import SequenceEditor from "./SequenceEditor";

export default connect(
  (state, ownProps) => ({
    isLoading: song.selectors.getIsSongLoading(state),
    isRedoEnabled: song.selectors.getIsRedoEnabled(state),
    isUndoEnabled: song.selectors.getIsUndoEnabled(state),
    notes: song.selectors.getNotesBySequenceId(
      ownProps.match.params.sequenceId,
    )(state),
    sequence: song.selectors.getSequenceById(ownProps.match.params.sequenceId)(
      state,
    ),
  }),
  {
    onDelete: shared.actions.notesDeleted,
    onDraw: shared.actions.noteDrawn,
    onDrag: shared.actions.notesDragged,
    onDuplicate: shared.actions.notesDuplicated,
    onErase: shared.actions.noteErased,
    onLoad: shared.actions.sequenceEditorLoaded,
    onNudge: shared.actions.notesNudged,
    onOctaveDown: shared.actions.notesMovedOctaveDown,
    onOctaveUp: shared.actions.notesMovedOctaveUp,
    onRedo: shared.actions.redoRequested,
    onResize: shared.actions.notesResized,
    onUndo: shared.actions.undoRequested,
  },
  (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    onDraw: point => dispatchProps.onDraw(point, stateProps.sequence),
    onNudge: (delta, selectedNotes) =>
      dispatchProps.onNudge(delta, selectedNotes, stateProps.sequence),
  }),
)(SequenceEditor);
