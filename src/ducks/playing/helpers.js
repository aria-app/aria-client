import _ from 'lodash';
import Tone from 'tone';

export function createChannel(track) {
  return {
    id: track.id,
    activeSynths: [],
    previewSynth: createSynth(track.synthType),
    synths: createSynths(track.synthType),
  };
}

export function createSynths(type) {
  return _.times(12, () => createSynth(type));
}

export function createSynth(type, volume) {
  return new Tone.SimpleSynth({
    oscillator: { type },
    volume,
  }).toMaster();
}

export function sizeToSeconds(size) {
  return `(${size + 1} * 32n)`;
}
