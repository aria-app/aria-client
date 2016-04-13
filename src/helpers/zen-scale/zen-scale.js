import { pitches } from 'helpers/zen-pitches/zen-pitches';
import _ from 'lodash';

export function getScale() {
  return _([0, 1, 2, 3, 4, 5])
    .reverse()
    .flatMap(getOctave)
    .value();
}

function getOctave(octave) {
  return [
    { pitch: pitches.B, frequency: 30.87 * Math.pow(2, octave), octave },
    { pitch: pitches.BFLAT, frequency: 29.14 * Math.pow(2, octave), octave },
    { pitch: pitches.A, frequency: 27.50 * Math.pow(2, octave), octave },
    { pitch: pitches.GSHARP, frequency: 25.96 * Math.pow(2, octave), octave },
    { pitch: pitches.G, frequency: 24.50 * Math.pow(2, octave), octave },
    { pitch: pitches.FSHARP, frequency: 23.12 * Math.pow(2, octave), octave },
    { pitch: pitches.F, frequency: 21.83 * Math.pow(2, octave), octave },
    { pitch: pitches.E, frequency: 20.60 * Math.pow(2, octave), octave },
    { pitch: pitches.EFLAT, frequency: 19.45 * Math.pow(2, octave), octave },
    { pitch: pitches.D, frequency: 18.35 * Math.pow(2, octave), octave },
    { pitch: pitches.CSHARP, frequency: 17.32 * Math.pow(2, octave), octave },
    { pitch: pitches.C, frequency: 16.35 * Math.pow(2, octave), octave },
  ];
}
