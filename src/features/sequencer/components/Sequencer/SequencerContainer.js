import { connect } from 'react-redux';
import shared from '../../../shared';
import song from '../../../song';
import { Sequencer } from './Sequencer';

export const SequencerContainer = connect(state => ({
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
  onKeyPress: shared.actions.keyPressed,
  onNudge: shared.actions.notesNudged,
  onOctaveDown: shared.actions.notesMovedOctaveDown,
  onOctaveUp: shared.actions.notesMovedOctaveUp,
  onResize: shared.actions.notesResized,
}, (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  onDraw: point => dispatchProps.onDraw(point, stateProps.sequence),
  onKeyPress: pitch => dispatchProps.onKeyPress(pitch, stateProps.sequence),
}))(Sequencer);
