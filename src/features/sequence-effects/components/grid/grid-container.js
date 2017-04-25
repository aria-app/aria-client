import { connect } from 'react-redux';
import song from '../../../song';
import sequenceData from '../../../sequence-data';
import * as selectors from '../../selectors';
import { Grid } from './grid';

export const GridContainer = connect(state => ({
  activeSequenceId: song.selectors.getActiveSequenceId(state),
  areSomeNotesSelected: song.selectors.getAreSomeNotesSelected(state),
  measureCount: song.selectors.getActiveSequenceMeasureCount(state),
  notes: song.selectors.getActiveSequenceNotes(state),
  selectedNotes: song.selectors.getSelectedNotes(state),
  toolType: selectors.getToolType(state),
}), {
  onDraw: sequenceData.actions.noteDrawn,
  onDrag: sequenceData.actions.notesDragged,
  onResize: sequenceData.actions.notesResized,
  onSelectInArea: sequenceData.actions.notesSelectedInArea,
})(Grid);
