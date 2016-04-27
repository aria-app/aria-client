import { pitches } from '../zen-pitches/zen-pitches';
import _ from 'lodash';

export function getScale() {
  return _([0, 1, 2, 3, 4, 5, 6])
    .reverse()
    .flatMap(getOctave)
    .value();
}

export function getFrequency(note) {
  return {
    [pitches.B]: 30.87,
    [pitches.BFLAT]: 29.14,
    [pitches.A]: 27.50,
    [pitches.GSHARP]: 25.96,
    [pitches.G]: 24.50,
    [pitches.FSHARP]: 23.12,
    [pitches.F]: 21.83,
    [pitches.E]: 20.60,
    [pitches.EFLAT]: 19.45,
    [pitches.D]: 18.35,
    [pitches.CSHARP]: 17.32,
    [pitches.C]: 16.35,
  }[note.pitch] * Math.pow(2, note.octave);
}

function getOctave(octave) {
  return [
    { pitch: pitches.B, octave },
    { pitch: pitches.BFLAT, octave },
    { pitch: pitches.A, octave },
    { pitch: pitches.GSHARP, octave },
    { pitch: pitches.G, octave },
    { pitch: pitches.FSHARP, octave },
    { pitch: pitches.F, octave },
    { pitch: pitches.E, octave },
    { pitch: pitches.EFLAT, octave },
    { pitch: pitches.D, octave },
    { pitch: pitches.CSHARP, octave },
    { pitch: pitches.C, octave },
  ];
}
