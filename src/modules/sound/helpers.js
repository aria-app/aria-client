import _ from 'lodash';
import Tone from 'tone';
import * as constants from './constants';

export function createSynth(type) {
  return new Tone.PolySynth(24, Tone.SimpleSynth, {
    oscillator: { type },
    volume: -10,
  }).toMaster();
}

export function getNoteName(yPosition) {
  const octaveNumber = ((constants.octaveRange.length - 1) - Math.floor(yPosition / 12));
  const letter = getLetter(yPosition);
  return `${letter}${octaveNumber}`;
}

export function getScale() {
  return _(constants.octaveRange)
    .flatMap(octave => _.range(12).map(step => {
      const yPosition = (octave * 12) + step;
      return {
        name: getNoteName(yPosition),
        yPosition,
      };
    }))
    .value();
}

export function getType(synth) {
  return synth.voices[0].oscillator.type;
}

function getLetter(position) {
  return [
    'B',
    'A#',
    'A',
    'G#',
    'G',
    'F#',
    'F',
    'E',
    'D#',
    'D',
    'C#',
    'C',
  ][position % 12];
}
