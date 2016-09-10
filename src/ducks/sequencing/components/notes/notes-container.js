import { connect } from 'react-redux';
import { Notes } from '../notes/notes';
import moving from '../../../moving';
import notes from '../../../notes';
import panning from '../../../panning';
import playing from '../../../playing';
import resizing from '../../../resizing';
import selecting from '../../../selecting';
import song from '../../../song';
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
