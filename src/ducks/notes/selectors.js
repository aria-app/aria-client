import _ from 'lodash';
import { createSelector } from 'reselect';
import song from 'ducks/song';
import { NAME } from './constants';

const get = state => state[NAME];

export const getRedos = state => get(state).redos;
export const getSelectedNoteIds = state => get(state).selectedNoteIds;
export const getUndos = state => get(state).undos;
export const getIsSelectionActive = createSelector(
  getSelectedNoteIds,
  (selectedNoteIds) => !_.isEmpty(selectedNoteIds)
);
export const getSelectedNotes = createSelector(
  song.selectors.getActiveNotes,
  getSelectedNoteIds,
  (notes, selectedNoteIds) => _.filter(
    notes,
    n => _.includes(selectedNoteIds, n.id)
  )
);
