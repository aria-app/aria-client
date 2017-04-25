import { connect } from 'react-redux';
import song from '../../../song';
import sequenceData from '../../../sequence-data';
import * as selectors from '../../selectors';
import { Notes } from './notes';

export const NotesContainer = connect(state => ({
  measureCount: song.selectors.getActiveSequenceMeasureCount(state),
  notes: song.selectors.getActiveSequenceNotes(state),
  toolType: selectors.getToolType(state),
}), {
  onErase: sequenceData.actions.noteErased,
  onSelect: sequenceData.actions.noteSelected,
})(Notes);
