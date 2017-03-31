import { connect } from 'react-redux';
import { Notes } from '../notes/notes';
import playback from '../../../playback';
import song from '../../../song';
import * as selectors from '../../selectors';

export const NotesContainer = connect(state => ({
  measureCount: song.selectors.getActiveSequenceMeasureCount(state),
  notes: song.selectors.getActiveSequenceNotes(state),
  selectedNotes: song.selectors.getSelectedNotes(state),
  toolType: selectors.getToolType(state),
}), {
  onDraw: song.actions.noteDrawn,
  onErase: song.actions.noteErased,
  onNotePreview: playback.actions.notePreviewed,
  onNoteSelect: song.actions.noteSelected,
})(Notes);
