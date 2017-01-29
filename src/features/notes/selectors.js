import { filter, flow, identity, includes, some } from 'lodash/fp';
import song from '../song';
import { NAME } from './constants';

const get = state => state[NAME];

export const getRedos = state => get(state).redos;
export const getSelectedIds = state => get(state).selectedIds;
export const getUndos = state => get(state).undos;

export const getAreSomeNotesSelected =
  flow(
    getSelectedIds,
    some(identity),
  );

const isSelectedNote = state => note =>
  flow(
    getSelectedIds,
    includes(note.id),
  )(state);

export const getSelectedNotes = state =>
  flow(
    song.selectors.getActiveSequenceNotes,
    filter(isSelectedNote(state)),
  )(state);
