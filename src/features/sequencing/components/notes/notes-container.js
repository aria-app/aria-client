import { connect } from 'react-redux';
import { Notes } from '../notes/notes';
import moving from '../../../moving';
import playing from '../../../playing';
import resizing from '../../../resizing';
import selecting from '../../../selecting';
import song from '../../../song';
import * as selectors from '../../selectors';

export const NotesContainer = connect(state => ({
  isMoving: moving.selectors.getIsMoving(state),
  isResizing: resizing.selectors.getIsResizing(state),
  isSelecting: selecting.selectors.getIsSelecting(state),
  measureCount: song.selectors.getActiveSequenceMeasureCount(state),
  notes: song.selectors.getActiveSequenceNotes(state),
  selectedNotes: song.selectors.getSelectedNotes(state),
  toolType: selectors.getToolType(state),
}), {
  onDraw: song.actions.noteDrawn,
  onErase: song.actions.noteErased,
  onMoveStart: moving.actions.started,
  onMoveUpdate: moving.actions.updated,
  onNotePreview: playing.actions.notePreviewed,
  onNoteSelect: song.actions.noteSelected,
  onResizeStart: resizing.actions.started,
  onResizeUpdate: resizing.actions.updated,
  onSelectStart: selecting.actions.started,
  onSelectUpdate: selecting.actions.updated,
})(Notes);
