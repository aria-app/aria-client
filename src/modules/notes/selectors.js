import { NAME } from './constants';

const get = state => state[NAME];

const getNotes = state => get(state).notes;
const getSelectedNotes = state => get(state).selectedNotes;

export default {
  get,
  getNotes,
  getSelectedNotes,
};
