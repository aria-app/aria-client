import { connect } from 'react-redux';
import shared from '../../../shared';
import song from '../../../song';
import { Sequencer } from './Sequencer';

export const SequencerContainer = connect(state => ({
  isRedoEnabled: song.selectors.getIsSequenceRedoEnabled(state),
  isUndoEnabled: song.selectors.getIsSequenceUndoEnabled(state),
  measureCount: song.selectors.getFocusedSequenceMeasureCount(state),
  noteMap: song.selectors.getNotes(state),
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
  onRedo: shared.actions.sequenceRedoRequested,
  onResize: shared.actions.notesResized,
  onUndo: shared.actions.sequenceUndoRequested,
}, (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  onDraw: point => dispatchProps.onDraw(point, stateProps.sequence),
  onNudge: (delta, selectedNotes) =>
    dispatchProps.onNudge(delta, selectedNotes, stateProps.sequence),
  onPitchPreview: pitch => dispatchProps.onPitchPreview(pitch, stateProps.sequence),
}))(Sequencer);
