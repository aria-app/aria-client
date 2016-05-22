import _ from 'lodash';
import { createSelector } from 'reselect';
import { NAME } from './constants';

const get = state => state[NAME];

export const getNotes = state => get(state).notes;
export const getRedos = state => get(state).redos;
export const getSelectedNoteIds = state => get(state).selectedNoteIds;
export const getUndos = state => get(state).undos;
export const getIsSelectionActive = createSelector(
  getSelectedNoteIds,
  (selectedNoteIds) => !_.isEmpty(selectedNoteIds)
);
export const getSelectedNotes = createSelector(
  getNotes,
  getSelectedNoteIds,
  (notes, selectedNoteIds) => _.filter(
    notes,
    n => _.includes(selectedNoteIds, n.id)
  )
);
