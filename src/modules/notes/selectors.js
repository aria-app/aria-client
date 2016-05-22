import _ from 'lodash';
import { createSelector } from 'reselect';
import { NAME } from './constants';

const get = state => state[NAME];

const getNotes = state => get(state).notes;
const getRedos = state => get(state).redos;
const getSelectedNoteIds = state => get(state).selectedNoteIds;
const getUndos = state => get(state).undos;
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
  getRedos,
  getUndos,
  getSelectedNotes,
  getSelectedNoteIds,
};
