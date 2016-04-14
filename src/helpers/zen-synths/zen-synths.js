import Tone from 'tone';

export const synths = [
  'pwm',
  'sawtooth',
  'sine',
  'square',
];



export function createSynth(type) {
  return new Tone.PolySynth(4, Tone.SimpleSynth, {
    oscillator: { type },
    volume: -20,
  }).toMaster();
}

export function getType(synth) {
  console.log(synth);
  return synth.voices[0].oscillator.type;
}
