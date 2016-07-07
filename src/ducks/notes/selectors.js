import _ from 'lodash';
import song from '../song';
import { NAME } from './constants';

const get = state => state[NAME];

export const getRedos = state => get(state).redos;
export const getSelectedIds = state => get(state).selectedIds;
export const getUndos = state => get(state).undos;
export const getIsSelectingActive = state =>
  !_.isEmpty(getSelectedIds(state));

export const getSelectedNotes = state =>
  _.filter(
    song.selectors.getActiveSequenceNotes(state),
    n => _.includes(getSelectedIds(state), n.id)
  );
