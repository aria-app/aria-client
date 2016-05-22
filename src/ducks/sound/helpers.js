import _ from 'lodash';
import Tone from 'tone';

export function createSynths(type) {
  return _.times(12, () => createSynth(type));
}

export function createSynth(type) {
  return new Tone.SimpleSynth({
    oscillator: { type },
    volume: -10,
  }).toMaster();
}
