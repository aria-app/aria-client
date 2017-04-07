import Tone from '../tone';

export default class Instrument {
  dispose() {
    this.voice.dispose();
  }

  getType() {
    return this.voice.oscillator.type;
  }

  playNote(name, length, time) {
    this.voice.triggerAttackRelease(name, length, time);
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
