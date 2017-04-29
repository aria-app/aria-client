import { connect } from 'react-redux';
import song from '../../../song';
import sequenceData from '../../../sequence-data';
import * as selectors from '../../selectors';
import { Sequencer } from './sequencer';

export const SequencerContainer = connect(state => ({
  activeSequenceId: song.selectors.getActiveSequenceId(state),
  measureCount: song.selectors.getActiveSequenceMeasureCount(state),
  notes: song.selectors.getActiveSequenceNotes(state),
  selectedNotes: song.selectors.getSelectedNotes(state),
  toolType: selectors.getToolType(state),
}), {
  onClose: sequenceData.actions.sequenceClosed,
  onDelete: sequenceData.actions.notesDeleted,
  onDeselectAll: sequenceData.actions.notesAllDeselected,
  onDraw: sequenceData.actions.noteDrawn,
  onDrag: sequenceData.actions.notesDragged,
  onDuplicate: sequenceData.actions.notesDuplicated,
  onErase: sequenceData.actions.noteErased,
  onKeyPress: sequenceData.actions.keyPressed,
  onNudge: sequenceData.actions.notesNudged,
  onOctaveDown: sequenceData.actions.notesMovedOctaveDown,
  onOctaveUp: sequenceData.actions.notesMovedOctaveUp,
  onResize: sequenceData.actions.notesResized,
  onSelect: sequenceData.actions.noteSelected,
  onSelectAll: sequenceData.actions.notesAllSelected,
  onSelectInArea: sequenceData.actions.notesSelectedInArea,
  onToolSelect: sequenceData.actions.toolSelected,
})(Sequencer);
