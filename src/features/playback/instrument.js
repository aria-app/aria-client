import { first, last } from 'lodash/fp';
import shared from '../shared';

const { Tone } = shared;

export default class Instrument {
  dispose() {
    this.voice.dispose();
  }

  getType() {
    return this.voice.oscillator.type;
  }

  playNote(note, time) {
    const name = shared.helpers.getNoteName(first(note.points).y);
    const length = shared.helpers.sizeToTime(last(note.points).x - first(note.points).x);
    this.voice.triggerAttackRelease(name, length, time);
  }

  previewNote(name) {
    this.voice.releaseAll();
    this.voice.triggerAttackRelease(name, '16n');
  }

  release() {
    this.voice.releaseAll();
  }

  setType(type) {
    this.voice.oscillator.type = type;
  }
}

Instrument.create = function create(id, type) {
  const instrument = new Instrument();

  instrument.id = id;
  instrument.type = type;
  instrument.voice = createSynth(instrument);

  return instrument;
};

function createSynth({ type }) {
  return Tone.createSynth({
    detune: 0,
    oscillator: {
      type,
    },
    volume: -15,
  }).toMaster();
}
