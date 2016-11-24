import _ from 'lodash';
import Tone from 'tone';
import shared from '../shared';

export default class Instrument {
  dispose() {
    this.activeVoices.forEach(s => s.dispose());
    this.availableVoices.forEach(s => s.dispose());
    this.previewVoice.dispose();
  }
  getAvailableVoice() {
    if (_.isEmpty(this.availableVoices)) return undefined;

    const voice = _.head(this.availableVoices);

    this.activeVoices = _.concat(this.activeVoices, voice);
    this.availableVoices = _.without(this.availableVoices, voice);

    return voice;
  }
  getType() {
    const voice = _.isEmpty(this.availableVoices)
      ? this.activeVoices[0]
      : this.availableVoices[0];

    return voice.oscillator.type;
  }
  makeVoiceAvailable(voice) {
    if (
      _.isEmpty(this.activeVoices) ||
      _.includes(this.availableVoices, voice)
    ) return;

    this.availableVoices = _.concat(this.availableVoices, voice);
    this.activeVoices = _.without(this.activeVoices, voice);
  }
  playNote(note, time) {
    const voice = this.getAvailableVoice();

    if (!voice) {
      // eslint-disable-next-line no-console
      console.log(`Voice unavailable to play note ${note}`);
      return;
    }

    const name = shared.helpers.getNoteName(_.first(note.points).y);
    const length = shared.helpers.sizeToTime(_.last(note.points).x - _.first(note.points).x);

    if (!doesNoteBend(note)) {
      voice.triggerAttackRelease(name, length, time);
    } else {
      voice.triggerRelease();
      voice.triggerAttack(name, time);

      if (_.last(note.points).y !== _.first(note.points).y) {
        const endName = shared.helpers.getNoteName(_.last(note.points).y);
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
    this.availableVoices = _.concat(this.availableVoices, this.activeVoices);
    this.activeVoices = [];

    this.availableVoices.forEach((v) => {
      v.triggerRelease();
    });
  }
  setType(type) {
    _.concat(this.activeVoices, this.availableVoices).forEach((v) => {
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
  return _.times(12, () => createSynth(instrument));
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
  const notePointYs = _.map(note.points, 'y');
  return notePointYs.length === _.uniq(notePointYs).length;
}
