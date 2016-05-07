import _ from 'lodash';
import { NAME } from './constants';

const get = state => state[NAME];

const getNotes = state => get(state).notes;
const getSelectedNoteIds = state => get(state).selectedNoteIds;
const getSelectedNotes = state => _.filter(get(state).notes,
  n => _.includes(get(state).selectedNoteIds, n.id)
);

export default {
  get,
  getNotes,
  getSelectedNotes,
  getSelectedNoteIds,
};
