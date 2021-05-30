import { Sequence } from '../../types';
import { DawwwNote, DawwwSong } from '../types';
import { noteToDawwwNote } from './noteToDawwwNote';
import { sequenceToDawwwSequence } from './sequenceToDawwwSequence';
import { setAtIds } from './setAtIds';

export function updateDawwwSongSequence(
  song: DawwwSong,
  sequence: Sequence,
): DawwwSong {
  return {
    ...song,
    focusedSequenceId: sequence.id,
    notes: setAtIds<DawwwNote>(sequence.notes.map(noteToDawwwNote), song.notes),
    sequences: {
      ...song.sequences,
      [sequence.id]: sequenceToDawwwSequence(sequence),
    },
  };
}
