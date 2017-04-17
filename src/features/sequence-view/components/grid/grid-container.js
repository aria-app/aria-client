import { connect } from 'react-redux';
import { Grid } from '../grid/grid';
import song from '../../../song';
import sequenceData from '../../../sequence-data';

export const GridContainer = connect(state => ({
  activeSequenceId: song.selectors.getActiveSequenceId(state),
  areSomeNotesSelected: song.selectors.getAreSomeNotesSelected(state),
  measureCount: song.selectors.getActiveSequenceMeasureCount(state),
  notes: song.selectors.getActiveSequenceNotes(state),
  selectedNotes: song.selectors.getSelectedNotes(state),
  toolType: sequenceData.selectors.getToolType(state),
}), {
  onDraw: sequenceData.actions.noteDrawn,
  onDrag: sequenceData.actions.notesDragged,
  onResize: sequenceData.actions.notesResized,
  onSelectInArea: sequenceData.actions.notesSelectedInArea,
})(Grid);
