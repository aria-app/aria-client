import { filter, includes, isEmpty } from 'lodash/fp';
import song from '../song';
import { NAME } from './constants';

const get = state => state[NAME];

export const getRedos = state => get(state).redos;
export const getSelectedIds = state => get(state).selectedIds;
export const getUndos = state => get(state).undos;

export const getAreSomeNotesSelected = state =>
  !isEmpty(getSelectedIds(state));

export const getSelectedNotes = state =>
  filter(
    n => includes(getSelectedIds(state), n.id),
    song.selectors.getActiveSequenceNotes(state),
  );
