import { concat, first, head, includes, isEmpty, last, map, times, uniq, without } from 'lodash/fp';
import Tone from 'tone';
import shared from '../shared';

export default class Instrument {
  dispose() {
    this.activeVoices.forEach(s => s.dispose());
    this.availableVoices.forEach(s => s.dispose());
    this.previewVoice.dispose();
  }
  getAvailableVoice() {
    if (isEmpty(this.availableVoices)) return undefined;

    const voice = head(this.availableVoices);

    this.activeVoices = concat(voice)(this.activeVoices);
    this.availableVoices = without(voice)(this.availableVoices);

    return voice;
  }
  getType() {
    const voice = isEmpty(this.availableVoices)
      ? this.activeVoices[0]
      : this.availableVoices[0];

    return voice.oscillator.type;
  }
  makeVoiceAvailable(voice) {
    if (
      isEmpty(this.activeVoices) ||
      includes(voice)(this.availableVoices)
    ) return;

    this.availableVoices = concat(voice)(this.availableVoices);
    this.activeVoices = without(voice)(this.activeVoices);
  }
  playNote(note, time) {
    const voice = this.getAvailableVoice();

    if (!voice) {
      // eslint-disable-next-line no-console
      console.log(`Voice unavailable to play note ${note}`);
      return;
    }

    const name = shared.helpers.getNoteName(first(note.points).y);
    const length = shared.helpers.sizeToTime(last(note.points).x - first(note.points).x);

    if (!doesNoteBend(note)) {
      voice.triggerAttackRelease(name, length, time);
    } else {
      voice.triggerRelease();
      voice.triggerAttack(name, time);

      if (last(note.points).y !== first(note.points).y) {
        const endName = shared.helpers.getNoteName(last(note.points).y);
        voice.frequency.linearRampToValueAtTime(endName, `+${length}`);
        voice.frequency.setValueAtTime(endName, `+${length}`);
      }
    }

    Tone.Transport.scheduleOnce(() => {
      if (voice && voice.envelope) {
        voice.triggerRelease();
        this.makeVoiceAvailable(voice);
      }
    }, `+(${length} - 0:0:0.1)`);
  }
  previewNote(name) {
    this.previewVoice.triggerRelease();
    this.previewVoice.triggerAttackRelease(name, '16n');
  }
  release() {
    this.availableVoices = concat(this.activeVoices)(this.availableVoices);
    this.activeVoices = [];

    this.availableVoices.forEach((v) => {
      v.triggerRelease();
    });
  }
  setType(type) {
    concat(this.availableVoices)(this.activeVoices).forEach((v) => {
      // eslint-disable-next-line no-param-reassign
      v.oscillator.type = type;
    });
  }
}

Instrument.create = function create(id, type) {
  const instrument = new Instrument();

  instrument.activeVoices = [];
  instrument.id = id;
  instrument.type = type;

  instrument.availableVoices = createSynths(instrument);
  instrument.previewVoice = createSynth(instrument);

  return instrument;
};

function createSynths(instrument) {
  return times(() => createSynth(instrument))(12);
}

function createSynth({ type }) {
  return new Tone.Synth({
    detune: 0,
    oscillator: {
      type,
    },
  }).toMaster();
}

function doesNoteBend(note) {
  const notePointYs = map('y')(note.points);
  return notePointYs.length === uniq(notePointYs).length;
}
