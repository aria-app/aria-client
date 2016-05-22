import _ from 'lodash';
import Tone from 'tone';

export function createSynths(type) {
  const synths = _.times(12, () => createSynth(type));

  console.log(synths);

  return synths;
}

export function createSynth(type) {
  const s = new Tone.SimpleSynth({
    oscillator: { type },
    volume: -10,
  }).toMaster();

  // console.log('creating', s);

  return s;
}
