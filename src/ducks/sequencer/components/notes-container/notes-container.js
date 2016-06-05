import { connect } from 'react-redux';
import { Notes } from '../notes/notes';
import moving from 'ducks/moving';
import notes from 'ducks/notes';
import panning from 'ducks/panning';
import playing from 'ducks/playing';
import resizing from 'ducks/resizing';
import selection from 'ducks/selection';
import song from 'ducks/song';
import * as selectors from '../../selectors';

export const NotesContainer = connect((state) => ({
  isMoving: moving.selectors.getIsMoving(state),
  isPanning: panning.selectors.getIsPanning(state),
  isResizing: resizing.selectors.getIsResizing(state),
  isSelecting: selection.selectors.getIsSelecting(state),
  measureCount: song.selectors.getActiveSequenceMeasureCount(state),
  mousePoint: selectors.getMousePoint(state),
  notes: song.selectors.getActiveSequenceNotes(state),
  selectedNotes: notes.selectors.getSelectedNotes(state),
}), {
  draw: notes.actions.draw,
  erase: notes.actions.erase,
  playNote: playing.effects.playNote,
  selectNote: notes.actions.selectNote,
  startMoving: moving.actions.start,
  startResizing: resizing.actions.start,
  startSelection: selection.actions.start,
  updateMoving: moving.actions.update,
  updateResizing: resizing.actions.update,
  updateSelection: selection.actions.update,
})(Notes);
