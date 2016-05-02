import _ from 'lodash';
import { NAME } from './constants';

const get = state => state[NAME];

const getDraggedNote = state => get(state).drag.draggedNote;
const getDragOffset = state => get(state).drag.dragOffset;
const getDragStartPosition = state => get(state).drag.dragStartPosition;
const getIsDragging = state => get(state).drag.isDragging;
const getNotes = state => get(state).notes;
const getSelectedNoteIds = state => get(state).selectedNoteIds;
const getSelectedNotes = state => _.filter(get(state).notes,
  n => _.includes(get(state).selectedNoteIds, n.id)
);

export default {
  get,
  getDraggedNote,
  getDragOffset,
  getDragStartPosition,
  getIsDragging,
  getNotes,
  getSelectedNotes,
  getSelectedNoteIds,
};
