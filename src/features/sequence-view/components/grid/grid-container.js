import { connect } from 'react-redux';
import { Grid } from '../grid/grid';
import song from '../../../song';
import sequenceData from '../../../sequence-data';

export const GridContainer = connect(state => ({
  activeSequenceId: song.selectors.getActiveSequenceId(state),
  areSomeNotesSelected: song.selectors.getAreSomeNotesSelected(state),
  measureCount: song.selectors.getActiveSequenceMeasureCount(state),
  toolType: sequenceData.selectors.getToolType(state),
}), {
  onDraw: sequenceData.actions.noteDrawn,
  onMove: sequenceData.actions.selectedNotesMoved,
  onResize: sequenceData.actions.selectedNotesSizeChanged,
  onSelect: sequenceData.actions.notesSelectedInArea,
})(Grid);
