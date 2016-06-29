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

export const NotesContainer = connect(state => ({
  isMoving: moving.selectors.getIsMoving(state),
  isPanning: panning.selectors.getIsPanning(state),
  isResizing: resizing.selectors.getIsResizing(state),
  isSelecting: selecting.selectors.getIsSelecting(state),
  measureCount: song.selectors.getActiveSequenceMeasureCount(state),
  mousePoint: selectors.getMousePoint(state),
  notes: song.selectors.getActiveSequenceNotes(state),
  selectedNotes: notes.selectors.getSelectedNotes(state),
}), {
  draw: notes.actions.noteDrawn,
  erase: notes.actions.noteErased,
  previewNote: playing.actions.notePreviewed,
  selectNote: notes.actions.noteSelected,
  startMoving: moving.actions.started,
  startResizing: resizing.actions.started,
  startSelecting: selecting.actions.started,
  updateMoving: moving.actions.updated,
  updateResizing: resizing.actions.updated,
  updateSelecting: selecting.actions.updated,
})(Notes);
