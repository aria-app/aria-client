import { NAME } from './constants';

const get = state => state[NAME];

const getDragEvent = state => get(state).dragEvent;
const getDragEventStartPosition = state => get(state).dragEvent.startPosition;
const getNotes = state => get(state).notes;
const getSelectedNote = state => get(state).selectedNote;

export default {
  get,
  getDragEvent,
  getDragEventStartPosition,
  getNotes,
  getSelectedNote,
};
