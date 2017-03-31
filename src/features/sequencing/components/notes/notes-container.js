import { connect } from 'react-redux';
import { Notes } from '../notes/notes';
import playing from '../../../playing';
import selecting from '../../../selecting';
import song from '../../../song';
import * as selectors from '../../selectors';

export const NotesContainer = connect(state => ({
  isSelecting: selecting.selectors.getIsSelecting(state),
  measureCount: song.selectors.getActiveSequenceMeasureCount(state),
  notes: song.selectors.getActiveSequenceNotes(state),
  selectedNotes: song.selectors.getSelectedNotes(state),
  toolType: selectors.getToolType(state),
}), {
  onDraw: song.actions.noteDrawn,
  onErase: song.actions.noteErased,
  onNotePreview: playing.actions.notePreviewed,
  onNoteSelect: song.actions.noteSelected,
  onSelectStart: selecting.actions.started,
  onSelectUpdate: selecting.actions.updated,
})(Notes);
