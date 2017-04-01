import { connect } from 'react-redux';
import { Notes } from '../notes/notes';
import song from '../../../song';
import * as selectors from '../../selectors';

export const NotesContainer = connect(state => ({
  measureCount: song.selectors.getActiveSequenceMeasureCount(state),
  notes: song.selectors.getActiveSequenceNotes(state),
  selectedNotes: song.selectors.getSelectedNotes(state),
  toolType: selectors.getToolType(state),
}), {
  onErase: song.actions.noteErased,
  onSelect: song.actions.noteSelected,
})(Notes);
