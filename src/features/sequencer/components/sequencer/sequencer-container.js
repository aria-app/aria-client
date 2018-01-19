import { connect } from 'react-redux';
import shared from '../../../shared';
import song from '../../../song';
import * as selectors from '../../selectors';
import { Sequencer } from './sequencer';

export const SequencerContainer = connect(state => ({
  measureCount: song.selectors.getActiveSequenceMeasureCount(state),
  notes: song.selectors.getActiveSequenceNotes(state),
  selectedNotes: song.selectors.getSelectedNotes(state),
  sequence: song.selectors.getActiveSequence(state),
  toolType: selectors.getToolType(state),
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
  onToolSelect: shared.actions.toolSelected,
})(Sequencer);
