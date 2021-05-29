import { Song, Track } from '../../types';
import { DawwwSong, DawwwTrack } from '../types';
import { noteToDawwwNote } from './noteToDawwwNote';
import { sequenceToDawwwSequence } from './sequenceToDawwwSequence';
import { setAtIds } from './setAtIds';

export function songToDawwwSong({
  bpm,
  id,
  measureCount,
  tracks,
}: Song): DawwwSong {
  const sequences = tracks.map((track) => track.sequences).flat();
  const notes = sequences.map((sequence) => sequence.notes).flat();

  return {
    bpm,
    focusedSequenceId: null,
    id,
    measureCount,
    notes: setAtIds(notes.map(noteToDawwwNote), {}),
    sequences: setAtIds(sequences.map(sequenceToDawwwSequence), {}),
    tracks: setAtIds(tracks.map(trackToDawwwTrack), {}),
  };
}

function trackToDawwwTrack({
  id,
  isMuted,
  isSoloing,
  voice,
  volume,
}: Track): DawwwTrack {
  return {
    id,
    isMuted,
    isSoloing,
    voice: voice.toneOscillatorType,
    // TODO: Good place to do readable version to weird Tone scale?
    volume,
  };
}
