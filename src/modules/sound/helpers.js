import _ from 'lodash';
import Tone from 'tone';

export const pitches = {
  B: 11,
  BFLAT: 10,
  A: 9,
  GSHARP: 8,
  G: 7,
  FSHARP: 6,
  F: 5,
  E: 4,
  EFLAT: 3,
  D: 2,
  CSHARP: 1,
  C: 0,
};

export function createSynth(type) {
  return new Tone.PolySynth(4, Tone.SimpleSynth, {
    oscillator: { type },
    volume: -20,
  }).toMaster();
}

export function getFrequency(pitch, octave) {
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
  }[pitch] * Math.pow(2, octave);
}

export function getLetter(pitch) {
  return [
    'c',
    'csharp',
    'd',
    'eflat',
    'e',
    'f',
    'fsharp',
    'g',
    'gsharp',
    'a',
    'bflat',
    'b',
  ][pitch];
}

export function getScale() {
  return _([0, 1, 2, 3, 4, 5, 6])
    .reverse()
    .flatMap(getScaleOctave)
    .value();
}

export function getType(synth) {
  return synth.voices[0].oscillator.type;
}

function getScaleOctave(octave) {
  return [
    getScaleStep(pitches.B, octave),
    getScaleStep(pitches.BFLAT, octave),
    getScaleStep(pitches.A, octave),
    getScaleStep(pitches.GSHARP, octave),
    getScaleStep(pitches.G, octave),
    getScaleStep(pitches.FSHARP, octave),
    getScaleStep(pitches.F, octave),
    getScaleStep(pitches.E, octave),
    getScaleStep(pitches.EFLAT, octave),
    getScaleStep(pitches.D, octave),
    getScaleStep(pitches.CSHARP, octave),
    getScaleStep(pitches.C, octave),
  ];
}

function getScaleStep(pitch, octave) {
  return {
    frequency: getFrequency(pitch, octave),
    letter: getLetter(pitch),
    octave,
    pitch,
  };
}
