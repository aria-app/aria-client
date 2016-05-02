import _ from 'lodash';
import { NAME } from './constants';

const get = state => state[NAME];

const getDraggedNote = state => get(state).draggedNote;
const getDragOffset = state => get(state).dragOffset;
const getDragStartPosition = state => get(state).dragStartPosition;
const getIsDragging = state => get(state).isDragging;
const getNotes = state => get(state).notes;
const getSelectedNoteId = state => get(state).selectedNoteId;
const getSelectedNote = state => _.find(get(state).notes, {
  id: get(state).selectedNoteId,
});

export default {
  get,
  getDraggedNote,
  getDragOffset,
  getDragStartPosition,
  getIsDragging,
  getNotes,
  getSelectedNote,
  getSelectedNoteId,
};
