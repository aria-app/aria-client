import _ from 'lodash';
import { createSelector } from 'reselect';
import song from 'ducks/song';
import { NAME } from './constants';

const get = state => state[NAME];

export const getRedos = state => get(state).redos;
export const getSelectedIds = state => get(state).selectedIds;
export const getUndos = state => get(state).undos;
export const getIsSelectingActive = createSelector(
  getSelectedIds,
  (selectedIds) => !_.isEmpty(selectedIds)
);
export const getSelectedNotes = createSelector(
  song.selectors.getActiveSequenceNotes,
  getSelectedIds,
  (notes, selectedIds) => _.filter(
    notes,
    n => _.includes(selectedIds, n.id)
  )
);
