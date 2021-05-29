import { Note } from '../../types';
import { DawwwNote } from '../types';

export function noteToDawwwNote({ id, points, sequence }: Note): DawwwNote {
  return {
    id,
    points,
    sequenceId: sequence.id,
  };
}
