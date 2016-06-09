import { connect } from 'react-redux';
import { Notes } from '../notes/notes';
import moving from 'ducks/moving';
import notes from 'ducks/notes';
import panning from 'ducks/panning';
import playing from 'ducks/playing';
import resizing from 'ducks/resizing';
import selecting from 'ducks/selecting';
import song from 'ducks/song';
import * as selectors from '../../selectors';

export const NotesContainer = connect((state) => ({
  isMoving: moving.selectors.getIsMoving(state),
  isPanning: panning.selectors.getIsPanning(state),
  isResizing: resizing.selectors.getIsResizing(state),
  isSelecting: selecting.selectors.getIsSelecting(state),
  measureCount: song.selectors.getActiveSequenceMeasureCount(state),
  mousePoint: selectors.getMousePoint(state),
  notes: song.selectors.getActiveSequenceNotes(state),
  selectedNotes: notes.selectors.getSelectedNotes(state),
}), {
  draw: notes.actions.draw,
  erase: notes.actions.erase,
  previewNote: playing.actions.previewNote,
  selectNote: notes.actions.selectNote,
  startMoving: moving.actions.start,
  startResizing: resizing.actions.start,
  startSelecting: selecting.actions.start,
  updateMoving: moving.actions.update,
  updateResizing: resizing.actions.update,
  updateSelecting: selecting.actions.update,
})(Notes);
