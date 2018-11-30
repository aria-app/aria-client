import { connect } from 'react-redux';
import shared from '../../../shared';
import song from '../../../song';
import { SequenceEditor } from './SequenceEditor';

export const SequenceEditorContainer = connect(state => ({
  isRedoEnabled: song.selectors.getIsRedoEnabled(state),
  isUndoEnabled: song.selectors.getIsUndoEnabled(state),
  measureCount: song.selectors.getFocusedSequenceMeasureCount(state),
  notes: song.selectors.getFocusedSequenceNotes(state),
  sequence: song.selectors.getFocusedSequence(state),
}), {
  onClose: shared.actions.trackerLoaded,
  onDelete: shared.actions.notesDeleted,
  onDraw: shared.actions.noteDrawn,
  onDrag: shared.actions.notesDragged,
  onDuplicate: shared.actions.notesDuplicated,
  onErase: shared.actions.noteErased,
  onNudge: shared.actions.notesNudged,
  onOctaveDown: shared.actions.notesMovedOctaveDown,
  onOctaveUp: shared.actions.notesMovedOctaveUp,
  onPitchPreview: shared.actions.pitchPreviewed,
  onRedo: shared.actions.redoRequested,
  onResize: shared.actions.notesResized,
  onUndo: shared.actions.undoRequested,
}, (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  onDraw: point => dispatchProps.onDraw(point, stateProps.sequence),
  onNudge: (delta, selectedNotes) =>
    dispatchProps.onNudge(delta, selectedNotes, stateProps.sequence),
  onPitchPreview: pitch => dispatchProps.onPitchPreview(pitch, stateProps.sequence),
}))(SequenceEditor);