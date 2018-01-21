import { connect } from 'react-redux';
import shared from '../../../shared';
import song from '../../../song';
import { Sequencer } from './Sequencer';

export const SequencerContainer = connect(state => ({
  measureCount: song.selectors.getActiveSequenceMeasureCount(state),
  notes: song.selectors.getActiveSequenceNotes(state),
  selectedNotes: song.selectors.getSelectedNotes(state),
  sequence: song.selectors.getActiveSequence(state),
}), {
  onClose: shared.actions.sequenceClosed,
  onDelete: shared.actions.notesDeleted,
  onDeselectAll: shared.actions.notesAllDeselected,
  onDraw: shared.actions.noteDrawn,
  onDrag: shared.actions.notesDragged,
  onDuplicate: shared.actions.notesDuplicated,
  onErase: shared.actions.noteErased,
  onKeyPress: shared.actions.keyPressed,
  onNudge: shared.actions.notesNudged,
  onOctaveDown: shared.actions.notesMovedOctaveDown,
  onOctaveUp: shared.actions.notesMovedOctaveUp,
  onResize: shared.actions.notesResized,
  onSelect: shared.actions.noteSelected,
  onSelectAll: shared.actions.notesAllSelected,
  onSelectInArea: shared.actions.notesSelectedInArea,
}, (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  onDraw: point => dispatchProps.onDraw(point, stateProps.sequence),
  onKeyPress: pitch => dispatchProps.onKeyPress(pitch, stateProps.sequence),
}))(Sequencer);
