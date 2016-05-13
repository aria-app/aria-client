import _ from 'lodash';
import Tone from 'tone';

export function createSynth(type) {
  return new Tone.PolySynth(24, Tone.SimpleSynth, {
    oscillator: { type },
    volume: -10,
  }).toMaster();
}
