import _ from 'lodash';
import { createSelector } from 'reselect';
import { NAME } from './constants';

const get = state => state[NAME];

const getNotes = state => get(state).notes;
const getNoteRedos = state => get(state).noteRedos;
const getNoteUndos = state => get(state).noteUndos;
const getSelectedNoteIds = state => get(state).selectedNoteIds;
const getSelectedNotes = createSelector(
  getNotes,
  getSelectedNoteIds,
  (notes, selectedNoteIds) => _.filter(
    notes,
    n => _.includes(selectedNoteIds, n.id)
  )
);

export default {
  get,
  getNotes,
  getNoteRedos,
  getNoteUndos,
  getSelectedNotes,
  getSelectedNoteIds,
};
