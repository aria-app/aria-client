import map from 'lodash/fp/map';
import { createNote } from './createNote';

export const duplicateNotes = map(note => createNote({
  points: note.points,
  sequenceId: note.sequenceId,
}));
