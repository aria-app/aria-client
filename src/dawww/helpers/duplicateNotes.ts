import map from 'lodash/fp/map';
import { Note } from '../../types';
import { createNote } from './createNote';

export const duplicateNotes: (notes: Array<Note>) => Array<Note> = map(note =>
  createNote(note.sequenceId, note.points),
);
