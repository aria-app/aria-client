import _ from 'lodash';
import { NAME } from './constants';

const get = state => state[NAME];

const getDraggedNote = state => get(state).drag.draggedNote;
const getDragOffset = state => get(state).drag.dragOffset;
const getDragStartPosition = state => get(state).drag.dragStartPosition;
const getIsDragging = state => get(state).drag.isDragging;
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
