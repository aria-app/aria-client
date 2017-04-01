import { connect } from 'react-redux';
import { Grid } from '../grid/grid';
import song from '../../../song';
import * as selectors from '../../selectors';

export const GridContainer = connect(state => ({
  areSomeNotesSelected: song.selectors.getAreSomeNotesSelected(state),
  measureCount: song.selectors.getActiveSequenceMeasureCount(state),
  toolType: selectors.getToolType(state),
}), {
  onDraw: song.actions.noteDrawn,
  onMove: song.actions.selectedNotesMoved,
  onResize: song.actions.selectedNotesSizeChanged,
  onSelect: song.actions.notesSelectedInArea,
})(Grid);
